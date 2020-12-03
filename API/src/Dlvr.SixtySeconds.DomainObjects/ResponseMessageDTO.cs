using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dlvr.SixtySeconds.DomainObjects
{
    public class ResponseDTO
    {
        public string Help { get; set; }

        public ResponseType ResponseType { get; set; }

        public string Message { get; set; }

        public string MessageTitle { get; set; }
    }

    public class ResponseDTO<T> : ResponseDTO
    {
        public T Data { get; set; }
    }

    public class PaggerResponseDTO<T>
    {
        public IEnumerable<T> Records { get; set; }

        public int TotalRecords { get; set; }

        public int PageIndex { get; set; }
    }

    public class PaggerRequestDTO
    {
        [Range(1, int.MaxValue)]
        public int PageIndex { get; set; }

        [Range(1, int.MaxValue)]
        public int PageSize { get; set; }

        public string SortBy { get; set; }

        public SortDirection Direction { get; set; }

        public string SearchKeyword { get; set; }
    }
}
