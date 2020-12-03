using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Dlvr.SixtySeconds.Services;
using Dlvr.SixtySeconds.Services.Contracts;
using Dlvr.SixtySeconds.Repositories.Contracts;
using Dlvr.SixtySeconds.Repositories;
using Dlvr.SixtySeconds.Models;
using AutoMapper;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc.Razor;
using Dlvr.SixtySeconds.Models.Contexts;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Dlvr.SixtySeconds.DomainObjects;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Dlvr.SixtySeconds.Shared.Constants;
using System.Reflection;
using System.IO;
using Dlvr.SixtySeconds.Api.Filters;

namespace Dlvr.SixtySeconds.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "60 Seconds API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme." + Environment.NewLine +
                      "Enter 'Bearer' [space] and then your token in the text input below." + Environment.NewLine +
                      "Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}
                    }
                });
                //c.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            var key = Encoding.ASCII.GetBytes(Configuration["Jwt:Key"]);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"]
                };
            });

            services.AddAuthorization(options =>
            {
                Scope.Permissions.ForEach(scope =>
                {
                    options.AddPolicy(scope, policy => policy.Requirements.Add(new ScopeRequirement(scope, Configuration["Jwt:Issuer"])));
                });
            });


            services.AddHttpContextAccessor();

            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSingleton<IAuthorizationHandler, ScopeHandler>();

            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<ILoginRepository, LoginRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuth0UserRepository, Auth0UserRepository>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IBusinessUnitService, BusinessUnitService>();
            services.AddScoped<IBusinessUnitRepository, BusinessUnitRepository>();
            services.AddScoped<ITaskAssignmentFeedbackService, TaskAssignmentFeedbackService>();
            services.AddScoped<ITaskAssignmentFeedbackRepository, TaskAssignmentFeedbackRepository>();
            services.AddScoped<ITaskAssignmentCommentService, TaskAssignmentCommentService>();
            services.AddScoped<ITaskAssignmentCommentRepository, TaskAssignmentCommentRepository>();
            services.AddScoped<IGalleryRepository, GalleryRepository>();
            services.AddScoped<IGalleryService, GalleryService>();
            services.AddScoped<IAudioRehearsalService, AudioRehearsalService>();
            services.AddScoped<IAudioRehearsalRepository, AudioRehearsalRepository>();
            services.AddScoped<IVideoRehearsalService, VideoRehearsalService>();
            services.AddScoped<IVideoRehearsalRepository, VideoRehearsalRepository>();

            services.AddScoped<ITokenDTO>(provider =>
            {
                var context = provider.GetService<IHttpContextAccessor>();

                if (context.HttpContext.User.HasClaim(t => t.Type.Equals("Id")))
                {
                    return new TokenDTO
                    {
                        Id = Convert.ToInt64(context.HttpContext.User.FindFirstValue("Id")),
                        Auth0Id = context.HttpContext.User.FindFirstValue("Auth0Id"),
                        BusinessUnitId = Convert.ToInt64(context.HttpContext.User.FindFirstValue("BusinessUnitId")),
                        RoleId = Convert.ToInt32(context.HttpContext.User.FindFirstValue("RoleId")),
                        TokenId = Guid.Parse(context.HttpContext.User.FindFirstValue("TokenId")),
                        ReportTo = Convert.ToInt64(context.HttpContext.User.FindFirstValue("ReportTo")),
                        FirstName = context.HttpContext.User.FindFirstValue("FirstName"),
                        LastName = context.HttpContext.User.FindFirstValue("LastName"),
                        Email = context.HttpContext.User.FindFirstValue(ClaimTypes.Email),
                        Phone = context.HttpContext.User.FindFirstValue(ClaimTypes.MobilePhone),
                        Permissions = context.HttpContext.User.FindFirstValue("Permissions"),
                        SessionId = Guid.Parse(context.HttpContext.User.FindFirstValue("SessionId"))
                    };
                }
                else
                {
                    return new TokenDTO()
                    {
                        Id = 2,
                        BusinessUnitId = 1,
                        RoleId = 2,
                        FirstName = "Hello",
                        LastName = "User",
                        Email = "developer@thedlvr.co"
                    };
                }
            });

            services.AddDbContext<SixtySecondsDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AzureSqlSixDevCon")));


            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            //Adding localization to application
            services.AddLocalization();
            services.AddMvc()
                .AddViewLocalization(
                    LanguageViewLocationExpanderFormat.Suffix)
                .AddDataAnnotationsLocalization();

            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en-US"),
                        new CultureInfo("fr-FR"),
                    };
                    options.DefaultRequestCulture = new RequestCulture(culture: "en-US", uiCulture: "en-US");
                    // Formatting numbers, dates, etc.
                    options.SupportedCultures = supportedCultures;
                    // UI strings that we have localized.
                    options.SupportedUICultures = supportedCultures;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var localizeOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(localizeOptions.Value);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "60 Seconds V1");
            });

            //app.UseCors();
            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
