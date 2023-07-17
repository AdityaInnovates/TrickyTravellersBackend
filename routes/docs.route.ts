import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDefinition from "../docs/swaggerDef";
import swaggerUi from "swagger-ui-express";
const router = express.Router();
const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["/routes/*.js", "src/docs/*.yml"],
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    customSiteTitle: "NODE Template - API",
    customCss: `

    
  .swagger-ui .topbar .download-url-wrapper { display: none } 
  #subheader {z-index: 0;padding:145px 0 1px 0 !important}
  .topbar{display: none}
  .swagger-ui .auth-btn-wrapper .btn-done {margin-left:15px}

  .swagger-ui .info .title small pre {display: none}
  hgroup h2 span {display: none}
  .swagger-ui .info{margin: 10px 0 !important;height:135px;overflow: hidden}

  .swagger-ui .opblock.opblock-post .opblock-summary{border-color:#686868}
  .swagger-ui .wrapper{width:100% !important;}
  .main .url {display: none}

  /*.swagger-ui .info .title{font-family:"Roboto",sans-serif !important}
  .swagger-ui .info li, .swagger-ui .info p, .swagger-ui .info table{font-family:"Roboto",sans-serif !important}
  .swagger-ui .opblock .opblock-summary-description{font-family:"Roboto",sans-serif !important}
  .swagger-ui .model-title{font-family:"Roboto",sans-serif !important}*/
  .swagger-ui .scheme-container{margin:18px 20px 20px;padding:10px 0 35px 0;border:2px solid #ddd;box-shadow:none;border-radius:4px;box-shadow:0 0 3px rgba(0,0,0,.19)}
  .swagger-ui .opblock-tag {background-color:#f1f1f1 !important; }
  .swagger-ui .auth-wrapper .authorize{margin-right:-12px}
  .swagger-ui select{padding:9px 40px 10px 9px}
  .swagger-ui .servers > label{margin:5px 15px 0 -10px}
  .swagger-ui section.models h4 span{font-weight:bold}

  .swagger-ui .information-container section {padding:0px 0 0px 0 !important}
  .swagger-ui .wrapper section {padding:0px !important}
  .swagger-ui .servers-title{margin:0 -10px}
  .swagger-ui{font-family: "Nunito", Helvetica, Arial, sans-serif !important}

  .swagger-ui .information-container  .info__tos {display: none}
  .swagger-ui section.models.is-open{ padding-bottom: 20px !important}
  .rightnavbar{font-size: 13px; padding-top: 25px;padding-left:0px !important;padding-right: 0px !important}
  .rightnavbar a:hover { font-weight: bold;}
  .rightnav_heading{padding:.75rem !important;color:#3b4151 !important;background-color:#f1f1f1 !important;border-color:rgba(0,0,0,.125) !important}
  .rightactive{border-left: 3px solid #fd7e14 !important}

   .swagger-ui .opblock-summary-path {width: 100%;}
   .swagger-ui .opblock .opblock-summary-description {width: 510px}
`,
  })
);

export default router;
