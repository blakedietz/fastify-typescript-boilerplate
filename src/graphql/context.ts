interface User {
  isAuthenticated: boolean;
  // iss?: string;
  // sub?: string;
  // aud?: string[];
  // iat?: number;
  // exp?: number;
  // azp?: string;
  // scope?: string;
  // permissions?: string;
}

export interface GraphQlContext {
  auth: {
    user: User;
  };
}

export const context = async function({ req }): Promise<GraphQlContext> {
  try {
    // Strip out "Bearer " from the token to verify that the token is working
    const token = req.headers.authorization.replace('Bearer ', '');

    return {
      auth: {
        user: { isAuthenticated: true },
      },
    };
  } catch (e) {
    return {
      auth: {
        user: { isAuthenticated: false },
      },
    };
  }
};
