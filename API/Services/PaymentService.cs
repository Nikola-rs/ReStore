using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        public readonly IConfiguration _configuration;
        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
            
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket){
            StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
            var diliveryfee = subtotal > 100000 ? 0 : 500;

            if(string.IsNullOrEmpty(basket.PaymentIntentId)){
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + diliveryfee,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> {"card"}
                };
                intent = await service.CreateAsync(options);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + diliveryfee
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            return intent;
        }
    }
}