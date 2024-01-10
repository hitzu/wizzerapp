export const swCreateUserFunction = {
  summary: 'create User',
  tags: ['users'],
  responses: {
    '201': {
      description: 'create a simple user',
      content: {
        "application/json": {
          schema: {
            "type": "object",
            "required": [
                "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "name",
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "createdAt": {
                "type": "string"
              },
              "updatedAt": {
                "type": "string"
              },
              "deletedAt": {
                "type": "string"
              },
              "name": {
                  "type": "string"
              },
            }
          }
        }
      }
    },
    '400': {
      description: 'joi validation error',
    },
    '500': {
      description: 'unknow error',
    }
  },
  parameters: [
    {
      in: 'body',
      name: 'name',
      require: true
    },
  ]
};

export const swGetAllUsersFunction = {
  summary: 'get all users',
  tags: ['users'],
  responses: {
    '200': {
      description: 'list of currents users',
      content: {
        "application/json": {
          schema: {
              type: "array",
              items: {
                "type": "object",
                "required": [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "name",
                ],
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "createdAt": {
                    "type": "string"
                  },
                  "updatedAt": {
                    "type": "string"
                  },
                  "deletedAt": {
                    "type": "string"
                  },
                  "name": {
                      "type": "string"
                  },
                }
              }
          }
        }
      }
    },
    '400': {
      description: 'joi validation error',
    },
    '500': {
      description: 'unknow error',
    }
  },
  parameters: [
    {
      in: 'body',
      name: 'name',
      require: true
    },
  ]
}

export const swGetUserByIdFunction = {
  summary: 'get user by id',
  tags: ['users'],
  responses: {
    '200': {
      description: 'user found by id',
      content: {
        "application/json": {
          schema: {
            "type": "object",
            "required": [
                "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "name",
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "createdAt": {
                "type": "string"
              },
              "updatedAt": {
                "type": "string"
              },
              "deletedAt": {
                "type": "string"
              },
              "name": {
                  "type": "string"
              },
            }
          }
        }
      }
    },
    '400': {
      description: 'joi validation error',
    },
    '404': {
      description: 'user not found',
    },
    '500': {
      description: 'unknow error',
    }
  },
  parameters: [
    {
      in: 'body',
      name: 'name',
      require: true
    },
  ]
}

export const swUserRouter = {
  '/users/': {
    post: {
      ...swCreateUserFunction,
    },
    get: {
      ...swGetAllUsersFunction
    }
  },
  '/users/:id': {
    get: {
      ...swGetUserByIdFunction
    }
  }
};