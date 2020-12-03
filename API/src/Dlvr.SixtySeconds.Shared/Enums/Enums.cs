using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.Shared.Enums
{
    public enum ResponseType
    {
        NONE = 0,

        SUCCESS = 1,

        ERROR = 2,

        WARNING = 3,

        INFO = 4
    }

    public enum SortDirection
    {
        ASC,

        DESC
    }

    public enum RoleType
    {
        SalesPerson,
        Coach,        
        Admin
    }
}
