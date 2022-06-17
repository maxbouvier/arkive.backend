module.exports = {
  "/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login with mobile",
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
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/UserLoginRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/verify-otp": {
    post: {
      tags: ["Authentication"],
      summary: "OTP Verification",
      // security: [
      //   {
      //     apiAuth: []
      //   }
      // ],
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
        // {
        //   $ref: '#/components/parameters/authToken'
        // }
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/UserOTPRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserOTPResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/resend-otp": {
    post: {
      tags: ["Authentication"],
      summary: "Resend OTP",

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
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/ResendOTPRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/user-profile": {
    post: {
      tags: ["Authentication"],
      summary: "Get user profile data",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/UserProfileRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserProfileresponseList",
              },
            },
          },
        },
      },
    },
  },
  "/edit-user-profile": {
    post: {
      tags: ["Authentication"],
      summary: "Get user profile data",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/UserProfileRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserProfileresponseList",
              },
            },
          },
        },
      },
    },
  },
  "/logout": {
    post: {
      tags: ["Authentication"],
      summary: "SignOut user ",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],

      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  // "/user-contacts": {
  //   post: {
  //     tags: ["Contacts"],
  //     summary: "Used for get all contacts of user who use Mappn",
  //     security: [
  //       {
  //         apiAuth: [],
  //       },
  //     ],
  //     parameters: [
  //       {
  //         $ref: "#/components/parameters/token",
  //       },
  //       {
  //         $ref: "#/components/parameters/nonce",
  //       },
  //       {
  //         $ref: "#/components/parameters/timestamp",
  //       },
  //       {
  //         $ref: "#/components/parameters/authToken",
  //       },
  //     ],
  //     requestBody: {
  //       required: true,
  //       content: {
  //         "application/json": {
  //           schema: {
  //             $ref: "#/components/schemas/UserContactRequestList",
  //           },
  //         },
  //       },
  //     },
  //     responses: {
  //       200: {
  //         description: "Return Contacts of Mappns",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               $ref: "#/components/schemas/FriendsResponseList",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  "/friend-request": {
    post: {
      tags: ["Friends"],
      summary: "send friends request ",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/UserFriendRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/friend-response": {
    post: {
      tags: ["Friends"],
      summary: "send friends request ",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserFriendResponseField",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/contacts": {
    post: {
      tags: ["Contacts"],
      summary:
        "Used for get all contacts, friends and thier pending requests of user who use Mappn",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserContactRequestList",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Return Contacts of Mappns",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserContactsresponseList",
              },
            },
          },
        },
      },
    },
  },
  "/remove-friend": {
    put: {
      tags: ["Friends"],
      summary: "remove friend",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/UserRemoveFriendRequestResponesList",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/create-album": {
    post: {
      tags: ["Album"],
      summary: "Create Album",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlbumCreateRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/update-album": {
    put: {
      tags: ["Album"],
      summary: "Update Album",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlbumUpdateRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/delete-album": {
    post: {
      tags: ["Album"],
      summary: "Delete Album",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlbumDeleteRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/user-albums": {
    get: {
      tags: ["Album"],
      summary: "Used for get all Albums of user",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      responses: {
        200: {
          description: "Return Contacts of Mappns",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserAllAlbumesResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/add-photo": {
    post: {
      tags: ["Album"],
      summary: "add photo to Albums",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlbumAddPhotoRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/user-albums-details": {
    post: {
      tags: ["Album"],
      summary: "Used for get all Albums details of user",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              $ref: "#/components/schemas/AlbumDetailsRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Return Contacts of Mappns",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AlbumDetailsResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/user-friends": {
    get: {
      tags: ["Friends"],
      summary: "Used for get all Friends of user",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      responses: {
        200: {
          description: "Return Contacts of Mappns",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserFriendsResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/delete-photo": {
    post: {
      tags: ["Album"],
      summary: "Delete photo",
      security: [
        {
          apiAuth: [],
        },
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
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PhotoDeleteRequestFields",
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
};
