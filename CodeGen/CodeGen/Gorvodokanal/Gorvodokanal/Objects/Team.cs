﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан программой.
//     Исполняемая версия:4.0.30319.42000
//
//     Изменения в этом файле могут привести к неправильной работе и будут потеряны в случае
//     повторной генерации кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace IIS.Gorvodokanal
{
    using System;
    using System.Xml;
    using ICSSoft.STORMNET;
    
    
    // *** Start programmer edit section *** (Using statements)

    // *** End programmer edit section *** (Using statements)


    /// <summary>
    /// Team.
    /// </summary>
    // *** Start programmer edit section *** (Team CustomAttributes)

    // *** End programmer edit section *** (Team CustomAttributes)
    [AutoAltered()]
    [AccessType(ICSSoft.STORMNET.AccessType.none)]
    [View("TeamE", new string[] {
            "Index as \'Номер бригады\'",
            "ShiftStartHour as \'Часы\' on \'-Начало смены\'",
            "ShiftStartMinutes as \'Минуты\' on \'-Начало смены\'",
            "ShiftEndHour as \'Часы\' on \'-Конец смены\'",
            "ShiftEndMinutes as \'Минуты\' on \'-Конец смены\'"})]
    [View("TeamL", new string[] {
            "Index as \'Номер бригады\'",
            "ShiftStartHour as \'Часы\' on \'-Начало смены\'",
            "ShiftStartMinutes as \'Минуты\' on \'-Начало смены\'",
            "ShiftEndHour as \'Часы\' on \'-Конец смены\'",
            "ShiftEndMinutes as \'Минуты\' on \'-Конец смены\'"})]
    public class Team : ICSSoft.STORMNET.DataObject
    {
        
        private int fIndex = 1;
        
        private int fShiftStartHour = 8;
        
        private int fShiftStartMinutes = 0;
        
        private int fShiftEndHour = 16;
        
        private int fShiftEndMinutes = 0;
        
        // *** Start programmer edit section *** (Team CustomMembers)

        // *** End programmer edit section *** (Team CustomMembers)

        
        /// <summary>
        /// Index.
        /// </summary>
        // *** Start programmer edit section *** (Team.Index CustomAttributes)

        // *** End programmer edit section *** (Team.Index CustomAttributes)
        [DisableInsertProperty(true)]
        [NotNull()]
        public virtual int Index
        {
            get
            {
                // *** Start programmer edit section *** (Team.Index Get start)

                // *** End programmer edit section *** (Team.Index Get start)
                int result = this.fIndex;
                // *** Start programmer edit section *** (Team.Index Get end)

                // *** End programmer edit section *** (Team.Index Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Team.Index Set start)

                // *** End programmer edit section *** (Team.Index Set start)
                this.fIndex = value;
                // *** Start programmer edit section *** (Team.Index Set end)

                // *** End programmer edit section *** (Team.Index Set end)
            }
        }
        
        /// <summary>
        /// ShiftStartHour.
        /// </summary>
        // *** Start programmer edit section *** (Team.ShiftStartHour CustomAttributes)

        // *** End programmer edit section *** (Team.ShiftStartHour CustomAttributes)
        public virtual int ShiftStartHour
        {
            get
            {
                // *** Start programmer edit section *** (Team.ShiftStartHour Get start)

                // *** End programmer edit section *** (Team.ShiftStartHour Get start)
                int result = this.fShiftStartHour;
                // *** Start programmer edit section *** (Team.ShiftStartHour Get end)

                // *** End programmer edit section *** (Team.ShiftStartHour Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Team.ShiftStartHour Set start)

                // *** End programmer edit section *** (Team.ShiftStartHour Set start)
                this.fShiftStartHour = value;
                // *** Start programmer edit section *** (Team.ShiftStartHour Set end)

                // *** End programmer edit section *** (Team.ShiftStartHour Set end)
            }
        }
        
        /// <summary>
        /// ShiftStartMinutes.
        /// </summary>
        // *** Start programmer edit section *** (Team.ShiftStartMinutes CustomAttributes)

        // *** End programmer edit section *** (Team.ShiftStartMinutes CustomAttributes)
        public virtual int ShiftStartMinutes
        {
            get
            {
                // *** Start programmer edit section *** (Team.ShiftStartMinutes Get start)

                // *** End programmer edit section *** (Team.ShiftStartMinutes Get start)
                int result = this.fShiftStartMinutes;
                // *** Start programmer edit section *** (Team.ShiftStartMinutes Get end)

                // *** End programmer edit section *** (Team.ShiftStartMinutes Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Team.ShiftStartMinutes Set start)

                // *** End programmer edit section *** (Team.ShiftStartMinutes Set start)
                this.fShiftStartMinutes = value;
                // *** Start programmer edit section *** (Team.ShiftStartMinutes Set end)

                // *** End programmer edit section *** (Team.ShiftStartMinutes Set end)
            }
        }
        
        /// <summary>
        /// ShiftEndHour.
        /// </summary>
        // *** Start programmer edit section *** (Team.ShiftEndHour CustomAttributes)

        // *** End programmer edit section *** (Team.ShiftEndHour CustomAttributes)
        public virtual int ShiftEndHour
        {
            get
            {
                // *** Start programmer edit section *** (Team.ShiftEndHour Get start)

                // *** End programmer edit section *** (Team.ShiftEndHour Get start)
                int result = this.fShiftEndHour;
                // *** Start programmer edit section *** (Team.ShiftEndHour Get end)

                // *** End programmer edit section *** (Team.ShiftEndHour Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Team.ShiftEndHour Set start)

                // *** End programmer edit section *** (Team.ShiftEndHour Set start)
                this.fShiftEndHour = value;
                // *** Start programmer edit section *** (Team.ShiftEndHour Set end)

                // *** End programmer edit section *** (Team.ShiftEndHour Set end)
            }
        }
        
        /// <summary>
        /// ShiftEndMinutes.
        /// </summary>
        // *** Start programmer edit section *** (Team.ShiftEndMinutes CustomAttributes)

        // *** End programmer edit section *** (Team.ShiftEndMinutes CustomAttributes)
        public virtual int ShiftEndMinutes
        {
            get
            {
                // *** Start programmer edit section *** (Team.ShiftEndMinutes Get start)

                // *** End programmer edit section *** (Team.ShiftEndMinutes Get start)
                int result = this.fShiftEndMinutes;
                // *** Start programmer edit section *** (Team.ShiftEndMinutes Get end)

                // *** End programmer edit section *** (Team.ShiftEndMinutes Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Team.ShiftEndMinutes Set start)

                // *** End programmer edit section *** (Team.ShiftEndMinutes Set start)
                this.fShiftEndMinutes = value;
                // *** Start programmer edit section *** (Team.ShiftEndMinutes Set end)

                // *** End programmer edit section *** (Team.ShiftEndMinutes Set end)
            }
        }
        
        /// <summary>
        /// Class views container.
        /// </summary>
        public class Views
        {
            
            /// <summary>
            /// "TeamE" view.
            /// </summary>
            public static ICSSoft.STORMNET.View TeamE
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("TeamE", typeof(IIS.Gorvodokanal.Team));
                }
            }
            
            /// <summary>
            /// "TeamL" view.
            /// </summary>
            public static ICSSoft.STORMNET.View TeamL
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("TeamL", typeof(IIS.Gorvodokanal.Team));
                }
            }
        }
    }
}
