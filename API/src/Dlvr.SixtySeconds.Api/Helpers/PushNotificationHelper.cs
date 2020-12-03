using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Dlvr.SixtySeconds.Api.Helpers
{
    //public class PushNotificationHelper
    //{
    //    private const string _endpointUrl = "https://exp.host/--/api/v2/push/send";
    //    public async Task Send(NotificationModel notification)
    //    {
    //        try
    //        {
    //            using (HttpClient client = new HttpClient())
    //            {
    //                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    //                var content = new StringContent(JsonConvert.SerializeObject(notification), Encoding.UTF8, "application/json");

    //                HttpResponseMessage response = await client.PostAsync(_endpointUrl, content);

    //                if (response.IsSuccessStatusCode)
    //                {
    //                    var result = await response.Content.ReadAsStringAsync();
    //                    //Log Here
    //                }
    //                else
    //                {
    //                    //Log Here
    //                }
    //            }
    //        }
    //        catch (Exception ex)
    //        {
    //            //Log Here
    //            Console.WriteLine(ex.Message);
    //        }
    //    }
    //}
}
