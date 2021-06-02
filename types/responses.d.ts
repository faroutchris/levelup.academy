declare type LoginResponse = {
  accessToken: string;
};

declare type GenericErrorResponse = {
  message: string;
  extensions: {
    code: string;
    collection?: string;
    field?: string;
    invalid?: string;
  };
};
