declare type UserResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: 'local';
    confirmed: boolean;
    blocked: any;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
    };
    created_at: string;
    updated_at: string;
    paidCourses: any[];
    topics: Topic[];
  };
};
