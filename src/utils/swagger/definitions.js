module.exports = {
  CommonResponse: {
    type: "object",
    properties: {
      responseStatus: {
        type: "boolean",
      },
      responseCode: {
        type: "integer",
      },

      responseMessage: {
        type: "string",
      },
    },
  },
  UserLoginRequest: {
    type: "object",
    required: ["mobile_number", "country_isd_code"],
    properties: {
      country_isd_code: {
        type: "string",
      },
      mobile_number: {
        type: "string",
      },
    },
  },
  UserOTPRequest: {
    type: "object",
    required: ["otp", "mobile_number"],
    properties: {
      device_type: {
        type: "integer",
        description: "0 - IOS / 1 - Android",
      },
      device_token: {
        type: "string",
      },
      device_name: {
        type: "string",
      },
      device_version: {
        type: "string",
      },
      country_isd_code: {
        type: "string",
      },
      mobile_number: {
        type: "integer",
      },
      otp: {
        type: "integer",
      },
    },
  },
  UserOTPResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",

            $ref: "#/components/schemas/UserOTPResponseFields",
          },
        },
      },
    ],
  },
  UserOTPResponseFields: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      access_token: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
      photo_count: {
        type: "integer",
      },
    },
  },
  // ExistUserOTPResponseList: {
  //   type: 'object',
  //   allOf: [
  //     {
  //       $ref: '#/components/schemas/CommonResponse'
  //     },
  //     {
  //       properties: {
  //         responseData: {
  //           type: 'object',

  //           $ref: '#/components/schemas/ExistUserOTPResponseFields'
  //         }
  //       }
  //     }
  //   ]
  // },
  // ExistUserOTPResponseFields: {
  //   type: 'object',
  //   properties: {
  //     access_token: {
  //       type: 'string'
  //     },
  //     user_exist: {
  //       type: 'string'
  //     }
  //   }
  // },
  ResendOTPRequest: {
    type: "object",
    required: ["mobile_number", "country_isd_code"],
    properties: {
      country_isd_code: {
        type: "string",
      },
      mobile_number: {
        type: "string",
      },
    },
  },
  UserProfileresponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",

            $ref: "#/components/schemas/UserProfileResponseFields",
          },
        },
      },
    ],
  },
  UserProfileRequestFields: {
    type: "object",
    required: ["full_name", "username"],
    properties: {
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
    },
  },
  UserProfileResponseFields: {
    type: "object",
    required: ["full_name", "username"],
    properties: {
      _id: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
      photo_count: {
        type: "number",
      },
    },
  },
  UserContactResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              $ref: "#/components/schemas/UserContactResponseFields",
            },
          },
        },
      },
    ],
  },
  UserContactResponseFields: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
    },
  },
  UserContactRequestList: {
    type: "array",
    items: {
      type: "string",
    },
  },
  UserFriendRequestFields: {
    type: "object",
    required: ["to_user_id"],
    properties: {
      to_user_id: {
        type: "string",
      },
    },
  },
  UserFriendResponseField: {
    type: "object",
    required: ["_id", "flag"],
    properties: {
      _id: {
        type: "string",
      },
      flag: {
        type: "integer",
      },
    },
  },
  UserFriendRequestResponseField: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              $ref: "#/components/schemas/UserFriendRequestResponesList",
            },
          },
        },
      },
    ],
  },
  UserFriendRequestResponesList: {
    type: "object",
    properties: {
      request_id: {
        type: "string",
      },
      to_user_id: {
        type: "string",
      },
    },
  },
  FriendsResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              $ref: "#/components/schemas/FriendsResponseFields",
            },
            items: {
              $ref: "#/components/schemas/FriendsResponseFields",
            },
            items: {
              $ref: "#/components/schemas/FriendsResponseFields",
            },
          },
        },
      },
    ],
  },
  FriendsResponseFields: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
    },
  },
  UserContactsresponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",
            $ref: "#/components/schemas/UserContactsresponseFields",
          },
        },
      },
    ],
  },
  UserContactsresponseFields: {
    type: "object",
    properties: {
      Friends: {
        type: "array",
        items: {
          type: "object",
          $ref: "#/components/schemas/UserFriendresponseList",
        },
      },
      contacts: {
        type: "array",
        items: {
          type: "object",
          $ref: "#/components/schemas/UserContactsrsponseList",
        },
      },
      PendingRequest: {
        type: "array",
        items: {
          type: "object",
          $ref: "#/components/schemas/UserPendingrsponseList",
        },
      },
    },
  },
  UserFriendsResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              type: "object",
              $ref: "#/components/schemas/UserFriendresponseList",
            },
          },
        },
      },
    ],
  },
  UserFriendresponseList: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
    },
  },
  UserPendingrsponseList: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
    },
  },
  UserContactsrsponseList: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      request_status: {
        type: "integer",
      },
      request_status: {
        type: "integer",
      },
    },
  },
  UserRemoveFriendRequestResponesField: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",
            $ref: "#/components/schemas/UserFriendRequestResponesList",
          },
        },
      },
    ],
  },
  UserRemoveFriendRequestResponesList: {
    type: "object",
    properties: {
      to_user_id: {
        type: "string",
      },
    },
  },
  AlbumCreateRequestFields: {
    type: "object",
    required: ["album_name"],
    properties: {
      album_name: {
        type: "string",
      },
      album_members: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  AlbumUpdateRequestFields: {
    type: "object",
    required: ["album_name"],
    properties: {
      _id: {
        type: "string",
      },
      album_name: {
        type: "string",
      },
      album_members: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  AlbumDeleteRequestFields: {
    type: "object",
    required: ["_id"],
    properties: {
      _id: {
        type: "string",
      },
    },
  },
  UserAllAlbumesResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              $ref: "#/components/schemas/UserAllAlbumesResponseFields",
            },
          },
        },
      },
    ],
  },
  UserAllAlbumesResponseFields: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      album_name: {
        type: "string",
      },
      album_members: {
        type: "array",
        items: {
          type: "string",
        },
      },
      is_admin: {
        type: "integer",
      },
    },
  },
  AlbumAddPhotoRequestFields: {
    type: "object",
    required: ["album_id", "media"],
    properties: {
      album_id: {
        type: "array",
        items: {
          type: "string",
        },
      },
      Image_details: {
        type: "object",
        properties: {
          image: {
            type: "string",
          },
          photo_uplode_time: {
            type: "integer",
          },
        },
      },
    },
  },
  AlbumDetailsRequestFields: {
    type: "object",
    required: ["_id"],
    properties: {
      _id: {
        type: "string",
      },
    },
  },
  AlbumDetailsResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",

            $ref: "#/components/schemas/AlbumDetailsResponseFields",
          },
        },
      },
    ],
  },
  AlbumDetailsResponseFields: {
    type: "object",
    properties: {
      album_name: {
        type: "string",
      },
      album_members: {
        type: "integer",
      },
      media: {
        type: "array",
        items: {
          $ref: "#/components/schemas/MediaDetails",
        },
      },
      members_details: {
        type: "array",
        items: {
          $ref: "#/components/schemas/AlbumMembersDetail",
        },
      },
      other_friends_details: {
        type: "array",
        items: {
          $ref: "#/components/schemas/OtherFriendsDetail",
        },
      },
    },
  },
  MediaDetails: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      image: {
        type: "string",
      },
      photo_uplode_time: {
        type: "integer",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
    },
  },
  AlbumMembersDetail: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
    },
  },
  OtherFriendsDetail: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      full_name: {
        type: "string",
      },
      username: {
        type: "string",
      },
      profile_photo: {
        type: "string",
      },
    },
  },
  PhotoDeleteRequestFields: {
    type: "object",
    required: ["album_id", "image_id"],
    properties: {
      album_id: {
        type: "string",
      },
      image_id: {
        type: "string",
      },
    },
  },
};
