namespace IIS.Gorvodokanal
{
    using System;
    using System.Reflection;
    using System.Web.Http;

    using ICSSoft.STORMNET;
    using ICSSoft.Services;
    using IIS.Caseberry.Logging.Objects;

    using NewPlatform.Flexberry;
    using NewPlatform.Flexberry.AspNet.WebApi.Cors;
    using NewPlatform.Flexberry.ORM.ODataService;
    using NewPlatform.Flexberry.ORM.ODataService.Extensions;
    using NewPlatform.Flexberry.ORM.ODataService.Functions;
    using NewPlatform.Flexberry.ORM.ODataService.Model;
    using NewPlatform.Flexberry.Services;

    using Unity;
    using Unity.AspNet.WebApi;
    using ICSSoft.STORMNET.Business;
    using System.Data.SqlClient;
    using Npgsql;
    using System.Collections.Generic;
    using Newtonsoft.Json;

    /// <summary>
    /// Configure OData Service.
    /// </summary>
    internal static class ODataConfig
    {
        /// <summary>
        /// Configure OData by DataObjects assembly.
        /// </summary>
        /// <param name="config">Http configuration object.</param>
        /// <param name="container">Unity container.</param>
        public static void Configure(HttpConfiguration config, IUnityContainer container)
        {
            if (config == null)
            {
                throw new ArgumentNullException("config");
            }

            if (container == null)
            {
                throw new ArgumentNullException("container");
            }

            // To support CORS uncomment the line below.
            config.EnableCors(new DynamicCorsPolicyProvider(true));
            // Use constructor with true first parameter for enable SupportsCredentials.

            // Use Unity as WebAPI dependency resolver
            config.DependencyResolver = new UnityDependencyResolver(container);

            // Create EDM model builder
            var assemblies = new[]
            { 
                Assembly.Load("Gorvodokanal.Objects"),
                typeof(ApplicationLog).Assembly,
                typeof(UserSetting).Assembly,
                typeof(FlexberryUserSetting).Assembly,
                typeof(Lock).Assembly
            };
            var builder = new DefaultDataObjectEdmModelBuilder(assemblies);

            // Map OData Service
            var token = config.MapODataServiceDataObjectRoute(builder);

            // User functions
            token.Functions.Register(new Func<QueryParameters, string>(Test));
            token.Functions.Register(new Func<List<string>>(getTopEmergencyAddresses));
            token.Functions.Register(new Func<List<string>>(getTeamCompletedRequests));
            token.Functions.Register(new Func<List<string>>(getTotalTimePerMonth));
            token.Functions.Register(new Func<List<string>>(getTopStandingTeams));

            // Event handlers
            token.Events.CallbackAfterCreate = CallbackAfterCreate;
        }

        private static void CallbackAfterCreate(DataObject dataObject)
        {
            // TODO: implement handler
        }

        private static string Test(QueryParameters queryParameters)
        {
            return "Hello world!";
        }

        private static List<string> getTopEmergencyAddresses()
        {
            string connString =
                String.Format(
                    "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
                    "localhost",
                    "postgres",
                    "gorvodokanal",
                    "5432",
                    "123");

            using (var conn = new NpgsqlConnection(connString))

            {
                conn.Open();
                var sql = @"SELECT 
                                address.district,
                                address.street,
                                address.house,
                                address.build,
                                address.porch,
                                address.floor,
                                address.apartment,
                                COUNT(request.address)
                           FROM public.address
                           JOIN public.request ON request.address=address.primaryKey
                           GROUP BY address.district, address.street, address.house, address.porch, address.build, address.floor, address.apartment
                           ORDER BY COUNT(request.address) DESC
                           LIMIT 5";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();

                    List<string> addresses = new List<string>();
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, string> address = new Dictionary<string, string>();
                            address.Add("district", reader[0].ToString());
                            address.Add("street", reader[1].ToString());
                            address.Add("house", reader[2].ToString());
                            address.Add("build", reader[3].ToString());
                            address.Add("porch", reader[4].ToString());
                            address.Add("floor", reader[5].ToString());
                            address.Add("apartment", reader[6].ToString());
                            address.Add("count", reader[7].ToString());

                            var addressString = JsonConvert.SerializeObject(address, Formatting.Indented);
                            addresses.Add(addressString);
                        }
                        return addresses;
                    }
                }
            }
        }

        private static List<string> getTeamCompletedRequests()
        {
            string connString =
                String.Format(
                    "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
                    "localhost",
                    "postgres",
                    "gorvodokanal",
                    "5432",
                    "123");

            using (var conn = new NpgsqlConnection(connString))

            {
                conn.Open();
                var sql = @"SELECT 
                                team.index AS ""team"",
                                COUNT(request.team) AS ""count""
                            FROM public.request
                            JOIN public.team ON request.team=team.primaryKey
                            WHERE request.isCompleted=true
                            GROUP BY team.index
                            UNION
                            SELECT
                                team.index AS ""team"",
                                '0' AS ""count""
                            FROM public.team
                            WHERE team.index NOT IN
                                (SELECT
                                    team.index AS ""team""
                                 FROM public.request
                                 JOIN public.team ON request.team=team.primaryKey
                                 WHERE request.isCompleted=true
		                         GROUP BY team.index)
                            GROUP BY team.index
                            ORDER BY ""count"" DESC, ""team""";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();

                    List<string> teams = new List<string>();
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, string> address = new Dictionary<string, string>();
                            address.Add("teamIndex", reader[0].ToString());
                            address.Add("count", reader[1].ToString());

                            var addressString = JsonConvert.SerializeObject(address, Formatting.Indented);
                            teams.Add(addressString);
                        }
                        return teams;
                    }
                }
            }
        }

        private static List<string> getTotalTimePerMonth()
        {
            string connString =
                String.Format(
                    "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
                    "localhost",
                    "postgres",
                    "gorvodokanal",
                    "5432",
                    "123");

            using (var conn = new NpgsqlConnection(connString))

            {
                conn.Open();
                var sql = @"SELECT 
                                team.index,
                                SUM(request.dateend - request.datestart),
                                extract(MONTH from request.datestart)
                            FROM public.request
                            JOIN public.team ON request.team=team.primarykey
                            GROUP BY team.index, extract(MONTH from request.datestart)
                            ORDER BY extract(MONTH from request.datestart), team.index";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();

                    List<string> teams = new List<string>();
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, string> address = new Dictionary<string, string>();
                            address.Add("teamIndex", reader[0].ToString());
                            address.Add("fullDuration", reader[1].ToString());
                            address.Add("month", reader[2].ToString());

                            var addressString = JsonConvert.SerializeObject(address, Formatting.Indented);
                            teams.Add(addressString);
                        }
                        return teams;
                    }
                }
            }
        }

        private static List<string> getTopStandingTeams()
        {
            string connString =
                String.Format(
                    "Server={0};Username={1};Database={2};Port={3};Password={4};SSLMode=Prefer",
                    "localhost",
                    "postgres",
                    "gorvodokanal",
                    "5432",
                    "123");

            using (var conn = new NpgsqlConnection(connString))

            {
                conn.Open();
                var sql = @"SELECT
                                team.index AS ""team"",
                                '00:00:00' AS ""fullDuration""
                            FROM public.request
                            RIGHT JOIN public.team ON request.team=team.primarykey
                            WHERE request.team IS NULL
                            UNION
                            (SELECT
                                team.index AS ""team"",
                                '00:00:00' AS ""fullDuration""
                            FROM public.request
                            JOIN public.team ON request.team=team.primarykey
                            WHERE request.isappointed='назначено' 
                             AND request.iscompleted=false
                             AND team.index NOT IN (
                                 SELECT
                                    team.index AS ""team""

                                 FROM public.request
                                 JOIN public.team ON request.team=team.primarykey
                                 WHERE request.iscompleted=true
	                             GROUP BY team.index)
                            GROUP BY team.index
                            UNION
                            SELECT
                            team.index AS ""team"",
                            SUM(request.dateend - request.datestart) AS ""fullDuration""
                            FROM public.request
                            JOIN public.team ON request.team=team.primarykey
                            WHERE request.iscompleted=true
                            GROUP BY team.index)
                            ORDER BY ""fullDuration"", ""team""
                            LIMIT 5;";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();

                    List<string> teams = new List<string>();
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Dictionary<string, string> address = new Dictionary<string, string>();
                            address.Add("teamIndex", reader[0].ToString());
                            address.Add("fullDuration", reader[1].ToString());

                            var addressString = JsonConvert.SerializeObject(address, Formatting.Indented);
                            teams.Add(addressString);
                        }
                        return teams;
                    }
                }
            }
        }
    }
}