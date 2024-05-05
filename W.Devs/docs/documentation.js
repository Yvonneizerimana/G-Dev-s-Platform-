const swaggerDocumentation = {
    
        "swagger": "2.0",
        "info": {
          "version": "1.0.0",
          "title": "API Documentation",
          "description": "Documentation for the API endpoints"
        },
        "basePath": "/api/v1",
        "tags": [
          {
            "name": "admin",
            "description": "Operations related to admin"
          },
          {
            "name": "user",
            "description": "Operations related to user"
          }
        ],
        "paths": {
          "/admin/create": {
            "post": {
              "tags": [
                "admin"
              ],
              "summary": "Create a new admin",
              "description": "Create a new admin with provided details",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Admin object that needs to be created",
                  "required": true,
                  "schema": {
                    "$ref": "#/components/schemas/Admin"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Admin created successfully"
                },
                "400": {
                  "description": "Invalid request body"
                },
                "401": {
                  "description": "Unauthorized"
                }
              }
            }
          },
          "/admin/verify": {
            "post": {
              "tags": [
                "admin"
              ],
              "summary": "Verify admin",
              "description": "Verify admin using OTP",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "OTP object for verification",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "otp": {
                        "type": "integer"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Admin verified successfully"
                },
                "400": {
                  "description": "Invalid OTP"
                }
              }
            }
          },
          "/admin/login": {
            "post": {
              "tags": [
                "admin"
              ],
              "summary": "Login as admin",
              "description": "Authenticate admin using email and password",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Credentials for admin login",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string",
                        "format": "email"
                      },
                      "password": {
                        "type": "string"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Admin logged in successfully"
                },
                "400": {
                  "description": "Invalid email or password"
                }
              }
            }
          },
          "/admin/forgotPassword": {
            "post": {
              "tags": [
                "admin"
              ],
              "summary": "Forgot password",
              "description": "Send reset password instructions to admin's email",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Email address for password reset",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string",
                        "format": "email"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Password reset instructions sent successfully"
                },
                "400": {
                  "description": "Invalid email"
                }
              }
            }
          },
          "/admin/resetPassword/{resetToken}": {
            "post": {
              "tags": [
                "admin"
              ],
              "summary": "Reset password",
              "description": "Reset admin password using reset token",
              "parameters": [
                {
                  "in": "path",
                  "name": "resetToken",
                  "description": "Reset token received via email",
                  "required": true,
                  "type": "string"
                },
                {
                  "in": "body",
                  "name": "body",
                  "description": "New password for admin",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "password": {
                        "type": "string"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Password reset successful"
                },
                "400": {
                  "description": "Invalid reset token"
                }
              }
            }
          },
          "/admin/logout": {
            "get": {
              "tags": [
                "admin"
              ],
              "summary": "Logout",
              "description": "Logout the admin",
              "responses": {
                "200": {
                  "description": "Admin logged out successfully"
                }
              }
            }
          },
          "/admin/listOfAllUsers": {
            // Admin list of all users route documentation...
          },
          "/admin/listProfileById": {
            // Admin list profile by ID route documentation...
          },
          "/admin/verifyProfile": {
            // Admin verify profile route documentation...
          },
          "/admin/approved": {
            // Admin approve profile route documentation...
          },
          "/admin/rejected": {
            // Admin reject profile route documentation...
          },
          "/admin/updateProfile": {
            // Admin update profile route documentation...
          },
          "/admin/deleteProfile": {
            // Admin delete profile route documentation...
          },

          "/user/create": {
            "post": {
              "tags": [
                "user"
              ],
              "summary": "Create a new user",
              "description": "Create a new user with provided details",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "User object that needs to be created",
                  "required": true,
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "User created successfully"
                },
                "400": {
                  "description": "Invalid request body"
                }
              }
            }
          },
          "/user/verify": {
            "post": {
              "tags": [
                "user"
              ],
              "summary": "Verify user",
              "description": "Verify user using OTP",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "OTP object for verification",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "otp": {
                        "type": "integer"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "User verified successfully"
                },
                "400": {
                  "description": "Invalid OTP"
                }
              }
            }
          },
          "/user/login": {
            "post": {
              "tags": [
                "user"
              ],
              "summary": "Login as user",
              "description": "Authenticate user using email and password",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Credentials for user login",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string",
                        "format": "email"
                      },
                      "password": {
                        "type": "string"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "User logged in successfully"
                },
                "400": {
                  "description": "Invalid email or password"
                }
              }
            }
          },
          "/user/forgotPassword": {
            "post": {
              "tags": [
                "user"
              ],
              "summary": "Forgot password",
              "description": "Send reset password instructions to user's email",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Email address for password reset",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string",
                        "format": "email"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Password reset instructions sent successfully"
                },
                "400": {
                  "description": "Invalid email"
                }
              }
            }
          },
          "/user/resetPassword/{resetToken}": {
            "post": {
              "tags": [
                "user"
              ],
              "summary": "Reset password",
              "description": "Reset user password using reset token",
              "parameters": [
                {
                  "in": "path",
                  "name": "resetToken",
                  "description": "Reset token received via email",
                  "required": true,
                  "type": "string"
                },
                {
                  "in": "body",
                  "name": "body",
                  "description": "New password for user",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "password": {
                        "type": "string"
                      }
                    }
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Password reset successful"
                },
                "400": {
                  "description": "Invalid reset token"
                }
              }
            }
          },
          "/user/logout": {
            "get": {
              "tags": [
                "user"
              ],
              "summary": "Logout",
              "description": "Logout the user",
              "responses": {
                "200": {
                  "description": "User logged out successfully"
                }
              }
            }
          },
          "/user/profile": {
            "post": {
              "tags": [
                "user"
              ],
              "summary": "Create user profile",
              "description": "Create a new profile for the user",
              "consumes": [
                "multipart/form-data"
              ],

              "parameters": [
                {
            "in": "formData",
            "name": "file",
            "type": "file",
                  "in": "body",
                  "name": "body",
                  "description": "Profile object that needs to be created",
                  "required": true,
                  "schema": {
                    "$ref": "#/components/schemas/Profile"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Profile created successfully"
                },
                "400": {
                  "description": "Invalid request body"
                }
              }
            }
          },
          "/user/viewProfile": {
            "get": {
              "tags": [
                "user"
              ],
              "summary": "View user profile",
              "description": "View the profile of the logged-in user",
              "responses": {
                "200": {
                  "description": "Profile retrieved successfully"
                },
                "401": {
                  "description": "Unauthorized"
                }
              }
            }
          },
          "/user/updateProfile": {
            "put": {
              "tags": [
                "user"
              ],
              "summary": "Update user profile",
              "description": "Update the profile of the logged-in user",
              "parameters": [
                {
                  "in": "body",
                  "name": "body",
                  "description": "Updated profile object",
                  "required": true,
                  "schema": {
                    "$ref": "#/definitions/Profile"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Profile updated successfully"
                },
                "400": {
                  "description": "Invalid request body"
                }
              }
            }
          },
          "/user/deleteProfile": {
            "delete": {
              "tags": [
                "user"
              ],
              "summary": "Delete user profile",
              "description": "Delete the profile of the logged-in user",
              "responses": {
                "200": {
                  "description": "Profile deleted successfully"
                },
                "401": {
                  "description": "Unauthorized"
                }
              }
            }
          }
        },
      
      
    "components": {
      "schemas": {
        "Admin": {
          "type": "object",
          "required": [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "password",
            "otp",
            "verified"
          ],
          "properties": {
            "firstName": {
              "type": "string",
              "description": "First name of the admin"
            },
            "lastName": {
              "type": "string",
              "description": "Last name of the admin"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Email address of the admin"
            },
            "phoneNumber": {
              "type": "string",
              "description": "Phone number of the admin"
            },
            "role": {
              "type": "string",
              "default": "admin",
              "description": "Role of the admin"
            },
            "password": {
              "type": "string",
              "format": "password",
              "description": "Password of the admin"
            },
            "otp": {
              "type": "integer",
              "description": "OTP of the admin"
            },
            "otpExpires": {
              "type": "string",
              "format": "date-time",
              "description": "Expiration date of the OTP"
            },
            "verified": {
              "type": "boolean",
              "default": false,
              "description": "Verification status of the admin"
            },
            "resetToken": {
              "type": "string",
              "description": "Reset token for password reset"
            },
            "resetTokenExpires": {
              "type": "string",
              "format": "date-time",
              "description": "Expiration date of the reset token"
            }
          },
          "example": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phoneNumber": "+1234567890",
            "role": "admin",
            "password": "password123"
          }
        },
        "Profile": {
          "type": "object",
          "properties": {
            "personalInformation": {
              "type": "object",
              "properties": {
                "firstName": {
                  "type": "string",
                  "description": "First name of the user"
                },
                "middleName": {
                  "type": "string",
                  "description": "Middle name of the user"
                },
                "lastName": {
                  "type": "string",
                  "description": "Last name of the user"
                },
                "countryCode": {
                  "type": "string",
                  "description": "Country code of the user's phone number"
                },
                "phoneNumber": {
                  "type": "string",
                  "description": "Phone number of the user"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Email address of the user"
                }
              },
              "required": [
                "firstName",
                "middleName",
                "lastName",
                "countryCode",
                "phoneNumber",
                "email"
              ]
            },
            "education": {
              "type": "object",
              "properties": {
                "school": {
                  "type": "string",
                  "description": "Name of the user's school"
                },
                "degree": {
                  "type": "string",
                  "description": "Degree obtained by the user"
                },
                "fieldOfStudy": {
                  "type": "string",
                  "description": "Field of study of the user"
                }
              },
              "required": ["school", "degree", "fieldOfStudy"]
            },
            "codingExperience": {
              "type": "object",
              "properties": {
                "company": {
                  "type": "string",
                  "description": "Name of the company where the user gained coding experience"
                },
                "position": {
                  "type": "string",
                  "description": "Position held by the user in the company"
                },
                "startDate": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Start date of the user's experience in the company"
                },
                "endDate": {
                  "type": "string",
                  "format": "date-time",
                  "description": "End date of the user's experience in the company"
                },
                "description": {
                  "type": "string",
                  "description": "Description of the user's coding experience"
                }
              },
              "required": ["company", "position", "startDate", "endDate", "description"]
            },
            "selectLanguage": {
              "type": "string",
              "description": "Selected programming language by the user",
              "enum": [
                "C",
                "C++",
                "Java",
                "Python",
                "JavaScript",
                "PHP",
                "Ruby",
                "C#",
                "Go",
                "Swift",
                "Kotlin",
                "Rust"
              ]
            },
            "selectLevelOfCoding": {
              "type": "string",
              "description": "Selected level of coding proficiency by the user",
              "enum": ["Beginner", "Intermediate", "Advanced"]
            },
            "completeChallenge": {
              "type": "string",
              "description": "Description of a completed coding challenge by the user"
            },
            "codewarUsername": {
              "type": "string",
              "description": "Username on Codewars platform"
            },
            "uploadDocuments": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Array of document paths uploaded by the user"
            },
            "documentPath": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Array of document paths"
            },
            "status": {
              "type": "string",
              "default": "Waiting to be approved by admin",
              "description": "Approval status of the user's profile"
            }
          },
          "example": {
            "personalInformation": {
              "firstName": "John",
              "middleName": "Adam",
              "lastName": "Doe",
              "countryCode": "+1",
              "phoneNumber": "+1234567890",
              "email": "john.doe@example.com"
            },
            "education": {
              "school": "University of Example",
              "degree": "Bachelor of Science",
              "fieldOfStudy": "Computer Science"
            },
            "codingExperience": {
              "company": "Example Corp",
              "position": "Software Engineer",
              "startDate": "2020-01-01T00:00:00Z",
              "endDate": "2022-12-31T23:59:59Z",
              "description": "Developed web applications using JavaScript and Node.js"
            },
            "selectLanguage": "JavaScript",
            "codewarUsername": "john_doe",
            "uploadDocuments": ["path/to/document1", "path/to/document2"]
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "description": "First name of the user"
            },
            "lastName": {
              "type": "string",
              "description": "Last name of the user"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Email address of the user"
            },
            "phoneNumber": {
              "type": "string",
              "description": "Phone number of the user"
            },
            "role": {
              "type": "string",
              "default": "user",
              "description": "Role of the user"
            },
            "password": {
              "type": "string",
              "format": "password",
              "description": "Password of the user"
            },
            "otp": {
              "type": "integer",
              "description": "OTP of the user"
            },
            "otpExpires": {
              "type": "string",
              "format": "date-time",
              "description": "Expiration date of the OTP"
            },
            "verified": {
              "type": "boolean",
              "default": false,
              "description": "Verification status of the user"
            },
            "resetToken": {
              "type": "string",
              "description": "Reset token for password reset"
            },
            "resetTokenExpires": {
              "type": "string",
              "format": "date-time",
              "description": "Expiration date of the reset token"
            }
          },
          "example": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phoneNumber": "+1234567890",
            "role": "user",
            "password": "password123"
            
          }
        }
      }
    }
  };
  
  export default swaggerDocumentation;
  