module.exports = {
  CommonResponse: {
    type: 'object',
    properties: {
      responseStatus: {
        type: 'boolean'
      },
      responseCode: {
        type: 'integer'
      },

      responseMessage: {
        type: 'string'
      }
    }
  },

  DepartmentResponseList: {
    type: 'object',
    allOf: [
      {
        $ref: '#/components/schemas/CommonResponse'
      },
      {
        properties: {
          responseData: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/DepartmentResponseFields'
            }
          }
        }
      }
    ]
  },
  DepartmentResponseFields: {
    type: 'object',
    properties: {
      department_uuid: {
        type: 'string'
      },
      department_name: {
        type: 'string'
      }
    }
  },
  UserLoginRequest: {
    type: 'object',
    required: ['mobile_number', 'country_isd_code'],
    properties: {
      country_isd_code: {
        type: 'string'
      },
      mobile_number: {
        type: 'string'
      }
      
    }
  },
  UserOTPRequest: {
    type: 'object',
    required: ['otp', 'mobile_number'],
    properties: {
      device_token:{
        type: 'string'
      },
      device_name:{
        type: 'string'
      },
      device_version:{
        type: 'string'
      },
      country_isd_code:{
        type : 'string'
      },
      mobile_number: {
        type: 'integer'
      },
      otp: {
        type: 'integer'
      }
    }
  },
  UserOTPResponseList: {
    type: 'object',
    allOf: [
      {
        $ref: '#/components/schemas/CommonResponse'
      },
      {
        properties: {
          responseData: {
            type: 'object',

            $ref: '#/components/schemas/UserOTPResponseFields'
          }
        }
      }
    ]
  },
  UserOTPResponseFields: {
    type: 'object',
    properties: {
      access_token: {
        type: 'string'
      }
    }
  },
  ResendOTPRequest: {
    type: 'object',
    required: ['mobile_number','country_isd_code'],
    properties: {
      country_isd_code: {
        type: 'string'
      },
      mobile_number: {
        type: 'string'
      }
    }
  },
  UserProfileRequestList: {
    type: 'object',
    required: ['full_name', 'username'],
    properties: {
      full_name: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      profile_photo: {
        type: 'string'
      }
    }
  },
  UserContactResponseList: {
    type: 'object',
    allOf: [
      {
        $ref: '#/components/schemas/CommonResponse'
      },
      {
        properties: {
          responseData: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/UserContactResponseFields'
            }
          }
        }
      }
    ]
  },
  UserContactResponseFields: {
    type: 'object',
    properties: {
      _id: {
        type: 'string'
      },
      full_name: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      profile_photo: {
        type: 'string'
      }
    }
  }
}
