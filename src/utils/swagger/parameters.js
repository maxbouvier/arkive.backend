module.exports =  {
    token: {
      name: "token",
      description: "Api token",
  
      in: "header",
      required: true,
      schema: {
        type: "string",
        default:
          "f9ade52f2002a4de5b6115b3a7bcc61a8fd274b8fe0c85866ee4310e2027aba8",
      },
    },
    nonce: {
      name: "nonce",
      description: "random number used to generate token",
      in: "header",
      required: true,
      schema: {
        type: "string",
        default: "1647323101921",
      },
    },
    timestamp: {
      name: "timestamp",
      description: "timestamp used to generate token",
      in: "header",
      required: true,
      schema: {
        type: "string",
        default: "1647323101921",
      },
    },
    authToken: {
      name: "Authorization",
      in: "header",
      required: true,
      schema: {
        type: "string",
      },
    },
  };
  