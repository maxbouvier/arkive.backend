module.exports = {
  '/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Login with mobile',
      parameters: [
        {
          $ref: '#/components/parameters/token'
        },
        {
          $ref: '#/components/parameters/nonce'
        },
        {
          $ref: '#/components/parameters/timestamp'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              $ref: '#/components/schemas/UserLoginRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommonResponse'
              }
            }
          }
        }
      }
    }
  },
  '/verify-otp': {
    post: {
      tags: ['Authentication'],
      summary: 'OTP Verification',
      // security: [
      //   {
      //     apiAuth: []
      //   }
      // ],
      parameters: [
        {
          $ref: '#/components/parameters/token'
        },
        {
          $ref: '#/components/parameters/nonce'
        },
        {
          $ref: '#/components/parameters/timestamp'
        },
        // {
        //   $ref: '#/components/parameters/authToken'
        // }
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              $ref: '#/components/schemas/UserOTPRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserOTPResponseList'
              }
            }
          }
        }
      }
    }
  },
  '/resend-otp': {
    post: {
      tags: ['Authentication'],
      summary: 'Resend OTP',
     
      parameters: [
        {
          $ref: '#/components/parameters/token'
        },
        {
          $ref: '#/components/parameters/nonce'
        },
        {
          $ref: '#/components/parameters/timestamp'
        },
       
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              $ref: '#/components/schemas/ResendOTPRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommonResponse'
              }
            }
          }
        }
      }
    }
  },
  '/user-profile': {
    post: {
      tags: ['Authentication'],
      summary: 'Get user profile data',
      security: [
        {
          apiAuth: []
        }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/token'
        },
        {
          $ref: '#/components/parameters/nonce'
        },
        {
          $ref: '#/components/parameters/timestamp'
        },
        {
          $ref: '#/components/parameters/authToken'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              $ref: '#/components/schemas/UserProfileRequestList'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserProfileResponseList'
              }
            }
          }
        }
      }
    }
  },
  
  '/edit-user-profile': {
    post: {
      tags: ['Authentication'],
      summary: 'Get user profile data',
      security: [
        {
          apiAuth: []
        }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/token'
        },
        {
          $ref: '#/components/parameters/nonce'
        },
        {
          $ref: '#/components/parameters/timestamp'
        },
        {
          $ref: '#/components/parameters/authToken'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              $ref: '#/components/schemas/UserProfileRequestList'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserProfileResponseList'
              }
            }
          }
        }
      }
    }
  },
  '/logout': {
    post: {
      tags: ['Authentication'],
      summary: 'SignOut user ',
      security: [
        {
          apiAuth: []
        }
      ],
      parameters: [
        {
          $ref: '#/components/parameters/token'
        },
        {
          $ref: '#/components/parameters/nonce'
        },
        {
          $ref: '#/components/parameters/timestamp'
        },
        {
          $ref: '#/components/parameters/authToken'
        }
      ],
    
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommonResponse'
              }
            }
          }
        }
      }
    }
  },
  "/user-contacts": {
    post: {
      tags: ["Contacts"],
      summary: "Used for get all contacts of user who use Mappn",
      security: [
        {
          apiAuth: []
        }
      ],
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
      ],
      responses: {
        200: {
          description: "Return Technologies Name",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserContactResponseList",
              },
            },
          },
        },
      },
    },
  },
}
