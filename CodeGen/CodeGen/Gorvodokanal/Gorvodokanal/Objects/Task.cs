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
    /// Task.
    /// </summary>
    // *** Start programmer edit section *** (Task CustomAttributes)

    // *** End programmer edit section *** (Task CustomAttributes)
    [AutoAltered()]
    [AccessType(ICSSoft.STORMNET.AccessType.none)]
    [View("TaskE", new string[] {
            "Code as \'Код задачи\'",
            "Content as \'Детали задачи\'",
            "PlaneDuration as \'Примерная длительность работ\'"})]
    public class Task : ICSSoft.STORMNET.DataObject
    {
        
        private int fCode;
        
        private string fContent;
        
        private System.DateTime fPlaneDuration;
        
        private IIS.Gorvodokanal.Request fRequest;
        
        // *** Start programmer edit section *** (Task CustomMembers)

        // *** End programmer edit section *** (Task CustomMembers)

        
        /// <summary>
        /// Code.
        /// </summary>
        // *** Start programmer edit section *** (Task.Code CustomAttributes)

        // *** End programmer edit section *** (Task.Code CustomAttributes)
        [NotNull()]
        public virtual int Code
        {
            get
            {
                // *** Start programmer edit section *** (Task.Code Get start)

                // *** End programmer edit section *** (Task.Code Get start)
                int result = this.fCode;
                // *** Start programmer edit section *** (Task.Code Get end)

                // *** End programmer edit section *** (Task.Code Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Task.Code Set start)

                // *** End programmer edit section *** (Task.Code Set start)
                this.fCode = value;
                // *** Start programmer edit section *** (Task.Code Set end)

                // *** End programmer edit section *** (Task.Code Set end)
            }
        }
        
        /// <summary>
        /// Content.
        /// </summary>
        // *** Start programmer edit section *** (Task.Content CustomAttributes)

        // *** End programmer edit section *** (Task.Content CustomAttributes)
        [StrLen(255)]
        [NotNull()]
        public virtual string Content
        {
            get
            {
                // *** Start programmer edit section *** (Task.Content Get start)

                // *** End programmer edit section *** (Task.Content Get start)
                string result = this.fContent;
                // *** Start programmer edit section *** (Task.Content Get end)

                // *** End programmer edit section *** (Task.Content Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Task.Content Set start)

                // *** End programmer edit section *** (Task.Content Set start)
                this.fContent = value;
                // *** Start programmer edit section *** (Task.Content Set end)

                // *** End programmer edit section *** (Task.Content Set end)
            }
        }
        
        /// <summary>
        /// PlaneDuration.
        /// </summary>
        // *** Start programmer edit section *** (Task.PlaneDuration CustomAttributes)

        // *** End programmer edit section *** (Task.PlaneDuration CustomAttributes)
        [NotNull()]
        public virtual System.DateTime PlaneDuration
        {
            get
            {
                // *** Start programmer edit section *** (Task.PlaneDuration Get start)

                // *** End programmer edit section *** (Task.PlaneDuration Get start)
                System.DateTime result = this.fPlaneDuration;
                // *** Start programmer edit section *** (Task.PlaneDuration Get end)

                // *** End programmer edit section *** (Task.PlaneDuration Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Task.PlaneDuration Set start)

                // *** End programmer edit section *** (Task.PlaneDuration Set start)
                this.fPlaneDuration = value;
                // *** Start programmer edit section *** (Task.PlaneDuration Set end)

                // *** End programmer edit section *** (Task.PlaneDuration Set end)
            }
        }
        
        /// <summary>
        /// мастеровая ссылка на шапку IIS.Gorvodokanal.Request.
        /// </summary>
        // *** Start programmer edit section *** (Task.Request CustomAttributes)

        // *** End programmer edit section *** (Task.Request CustomAttributes)
        [Agregator()]
        [NotNull()]
        [PropertyStorage(new string[] {
                "Request"})]
        public virtual IIS.Gorvodokanal.Request Request
        {
            get
            {
                // *** Start programmer edit section *** (Task.Request Get start)

                // *** End programmer edit section *** (Task.Request Get start)
                IIS.Gorvodokanal.Request result = this.fRequest;
                // *** Start programmer edit section *** (Task.Request Get end)

                // *** End programmer edit section *** (Task.Request Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Task.Request Set start)

                // *** End programmer edit section *** (Task.Request Set start)
                this.fRequest = value;
                // *** Start programmer edit section *** (Task.Request Set end)

                // *** End programmer edit section *** (Task.Request Set end)
            }
        }
        
        /// <summary>
        /// Class views container.
        /// </summary>
        public class Views
        {
            
            /// <summary>
            /// "TaskE" view.
            /// </summary>
            public static ICSSoft.STORMNET.View TaskE
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("TaskE", typeof(IIS.Gorvodokanal.Task));
                }
            }
        }
    }
    
    /// <summary>
    /// Detail array of Task.
    /// </summary>
    // *** Start programmer edit section *** (DetailArrayDetailArrayOfTask CustomAttributes)

    // *** End programmer edit section *** (DetailArrayDetailArrayOfTask CustomAttributes)
    public class DetailArrayOfTask : ICSSoft.STORMNET.DetailArray
    {
        
        // *** Start programmer edit section *** (IIS.Gorvodokanal.DetailArrayOfTask members)

        // *** End programmer edit section *** (IIS.Gorvodokanal.DetailArrayOfTask members)

        
        /// <summary>
        /// Construct detail array.
        /// </summary>
        /// <summary>
        /// Returns object with type Task by index.
        /// </summary>
        /// <summary>
        /// Adds object with type Task.
        /// </summary>
        public DetailArrayOfTask(IIS.Gorvodokanal.Request fRequest) : 
                base(typeof(Task), ((ICSSoft.STORMNET.DataObject)(fRequest)))
        {
        }
        
        public IIS.Gorvodokanal.Task this[int index]
        {
            get
            {
                return ((IIS.Gorvodokanal.Task)(this.ItemByIndex(index)));
            }
        }
        
        public virtual void Add(IIS.Gorvodokanal.Task dataobject)
        {
            this.AddObject(((ICSSoft.STORMNET.DataObject)(dataobject)));
        }
    }
}
