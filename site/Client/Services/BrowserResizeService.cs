using System;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace site.Client.Services
{
    public class BrowserResizeService
    {
        private IJSRuntime _jsr;
        public BrowserResizeService(IJSRuntime jsr)
        {
            _jsr = jsr;
        }
        
        public static event Func<Task> OnResize;

        [JSInvokable]
        public static async Task OnBrowserResize()
        {
            await OnResize?.Invoke();           
        }

        public async Task<int> GetInnerHeight()
        {
            return await _jsr.InvokeAsync<int>("browserResize.getInnerHeight");
        }

        public async Task<int> GetInnerWidth()
        {
            return await _jsr.InvokeAsync<int>("browserResize.getInnerWidth");
        }
    }
}