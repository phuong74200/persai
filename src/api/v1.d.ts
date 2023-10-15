/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/v1/user/unban/{user_id}": {
    /** Unban a user (only for ADMIN) */
    put: operations["unbanUser"];
  };
  "/api/v1/user/pomodoro-clock": {
    /** Get pomodoro clock settings of current user */
    get: operations["getPomodoroClockOfCurrentUser"];
    /** Update pomodoro clock settings of current user */
    put: operations["updatePomodoroClockOfCurrentUser"];
  };
  "/api/v1/user/current": {
    /** Get current logged in user */
    get: operations["getCurrentUser"];
    /** Update current logged in user */
    put: operations["updateCurrentUser"];
  };
  "/api/v1/user/current/avatar": {
    /** Update avatar of current logged in user */
    put: operations["updateAvatarOfCurrentUser"];
  };
  "/api/v1/user/ban/{user_id}": {
    /** Ban a user (only for ADMIN) */
    put: operations["banUser"];
  };
  "/api/v1/subscription/upgrade": {
    /** Make request to upgrade subscription for a specific user (ONLY ADMIN) */
    put: operations["upgradeSubscription"];
  };
  "/api/v1/subscription/downgrade": {
    /** Cron Job server automatically calls this API to downgrade subscription after expiredDateTime */
    put: operations["downgradeSubscription"];
  };
  "/api/v1/study-set/{study_set_id}": {
    /** Get study set by ID */
    get: operations["getStudySetById"];
    /** Update pre-exist study set (under development) */
    put: operations["updateStudySet"];
    /** Delete study set by ID */
    delete: operations["deleteStudySet"];
  };
  "/api/v1/study-set/question/{question_id}/note": {
    /** Create or update note for a question of a study set (for current logged in user) */
    put: operations["createNoteOfCurrentQuestionForCurrentUser"];
  };
  "/api/v1/referral": {
    /** Enter other user's referral code to get free dates using PRO Subscription */
    put: operations["enterReferralCode"];
  };
  "/api/v1/study-set": {
    /** Get all study sets */
    get: operations["getAllStudySets"];
    /** Create new study set */
    post: operations["createStudySet"];
  };
  "/api/v1/study-set/excel": {
    /** Create new study set from excel format */
    post: operations["createStudySetFromExcel"];
  };
  "/api/v1/login/google": {
    /** API for logging in via Google */
    post: operations["loginUserViaGoogle"];
  };
  "/api/v1/welcome": {
    /** API for testing welcome users from server */
    get: operations["welcomeUser"];
  };
  "/api/v1/welcome/redirect": {
    get: operations["redirect"];
  };
  "/api/v1/user": {
    /** Get all users - students (only for ADMIN) */
    get: operations["getAllUsers"];
  };
  "/api/v1/user/{user_id}": {
    /** Get user by user ID (only for ADMIN) */
    get: operations["getUserById"];
  };
  "/api/v1/subscription": {
    /** Get all subscriptions */
    get: operations["getAllSubscription"];
  };
  "/api/v1/subscription/{subscription_id}": {
    /** Get subscription by ID */
    get: operations["getSubscriptionById"];
  };
  "/api/v1/subscription/upgrade-request/{upgrade_request_id}": {
    /** Get upgrade request by ID (ONLY ADMIN) */
    get: operations["getUpgradeRequestById"];
  };
  "/api/v1/subscription/upgrade-request/list": {
    /** Get all upgrade requests from students (ONLY ADMIN) */
    get: operations["getAllUpgradeRequests"];
  };
  "/api/v1/subscription/upgrade-request/current": {
    /** Student requests to upgrade subscription when choosing to fulfill the payment */
    get: operations["requestToUpgradeWithPayment"];
  };
  "/api/v1/study-set/current": {
    /** Get all study sets of current user */
    get: operations["getAllStudySetsOfCurrentUser"];
  };
  "/api/v1/new-access-token": {
    /**
     * Get new Access token by Refresh token
     * @description Include refresh token as bearer token in request header to get new access token together with new refresh token
     */
    get: operations["getNewAccessTokenFromRefreshToken"];
  };
  "/api/v1/image/{fe_image_name}": {
    /** View public image */
    get: operations["viewImageByImageName"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    GeneralResponse: {
      message?: string;
    };
    UpdatePomodoroRequest: {
      /**
       * Format: int32
       * @description min: 300(s)
       * @example 1500
       */
      studyTime?: number;
      /**
       * Format: int32
       * @description min: 60(s)
       * @example 300
       */
      shortBreak?: number;
      /**
       * Format: int32
       * @description min: 300(s)
       * @example 900
       */
      longBreak?: number;
      /**
       * Format: int32
       * @description min: 2
       * @example 4
       */
      longBreakInterval?: number;
      /**
       * @description ON or OFF
       * @enum {string}
       */
      status: "ON" | "OFF";
    };
    PomodoroResponse: {
      /** Format: int32 */
      id?: number;
      /** Format: uuid */
      userId?: string;
      userFullName?: string;
      /** Format: int32 */
      studyTime?: number;
      /** Format: int32 */
      shortBreak?: number;
      /** Format: int32 */
      longBreak?: number;
      /** Format: int32 */
      longBreakInterval?: number;
      /** @enum {string} */
      learningMethod?: "ALL";
      /** @enum {string} */
      status?: "ON" | "OFF";
    };
    UpdateUserRequest: {
      fullName?: string;
      /**
       * @description DEFAULT, GRAY, RED, PINK, GRAPE, VIOLET, INDIGO, BLUE, CYAN, TEAL, GREEN, LIME, YELLOW, ORANGE
       * @example DEFAULT
       * @enum {string}
       */
      theme?:
        | "Theme.DEFAULT"
        | "Theme.GRAY"
        | "Theme.RED"
        | "Theme.PINK"
        | "Theme.GRAPE"
        | "Theme.VIOLET"
        | "Theme.INDIGO"
        | "Theme.BLUE"
        | "Theme.CYAN"
        | "Theme.TEAL"
        | "Theme.GREEN"
        | "Theme.LIME"
        | "Theme.YELLOW"
        | "Theme.ORANGE";
    };
    ReferralCodeResponse: {
      referralCode?: string;
      /** Format: int32 */
      referenceNumber?: number;
      usingReferralCode?: boolean;
    };
    UserResponse: {
      /** Format: uuid */
      id?: string;
      email?: string;
      fullName?: string;
      feImageName?: string;
      /** @enum {string} */
      role?: "ADMIN" | "STUDENT";
      earnedMoney?: number;
      /** Format: int32 */
      gptRemainingUsage?: number;
      /** @enum {string} */
      theme?:
        | "Theme.DEFAULT"
        | "Theme.GRAY"
        | "Theme.RED"
        | "Theme.PINK"
        | "Theme.GRAPE"
        | "Theme.VIOLET"
        | "Theme.INDIGO"
        | "Theme.BLUE"
        | "Theme.CYAN"
        | "Theme.TEAL"
        | "Theme.GREEN"
        | "Theme.LIME"
        | "Theme.YELLOW"
        | "Theme.ORANGE";
      /** @enum {string} */
      status?: "DELETED" | "SUCCEED";
      enabled?: boolean;
      referralCode?: components["schemas"]["ReferralCodeResponse"];
      subscription?: components["schemas"]["UserSubscriptionResponse"];
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    UserSubscriptionResponse: {
      currentSubscriptionId?: string;
      paidSubscriptionId?: string;
      /** @enum {string} */
      paidType?: "NO" | "MONTHLY" | "YEARLY";
      /** Format: date-time */
      expiredDatetime?: string;
    };
    UpgradeSubscriptionRequest: {
      /**
       * Format: int32
       * @description Upgrade request ID of student upgrade request
       */
      upgradeRequestId: number;
    };
    DowngradeSubscriptionRequest: {
      secretKey: string;
      /** Format: uuid */
      userId: string;
    };
    CreatorResponse: {
      /** Format: uuid */
      userId?: string;
      userFullName?: string;
      userEmail?: string;
      userAvatar?: string;
    };
    QuestionResponse: {
      /** Format: int32 */
      id?: number;
      question?: string;
      answers?: string[];
      correctAnswer?: string;
      fullGptAnswer?: string;
      note?: string;
      gptGenerated?: boolean;
    };
    StudySetResponse: {
      /** Format: int32 */
      id?: number;
      studySetName?: string;
      feImageName?: string;
      creator?: components["schemas"]["CreatorResponse"];
      /** @enum {string} */
      visibility?: "PUBLIC" | "PRIVATE";
      status?: boolean;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      questionResponses?: components["schemas"]["QuestionResponse"][];
    };
    CreateUserQuestionNoteRequest: {
      note: string;
    };
    UserQuestionNoteResponse: {
      /** Format: uuid */
      userId?: string;
      /** Format: int32 */
      questionId?: number;
      note?: string;
    };
    ReferralCodeRequest: {
      referralCode: string;
    };
    CreateQuestionRequest: {
      question: string;
      answers: string[];
      /** @description Can be blank when you want GPT to generate answer */
      correctAnswer?: string;
      gptGenerated?: boolean;
    };
    CreateStudySetRequest: {
      studySetName: string;
      /**
       * @description BASIC only support PUBLIC, PRO can create PUBLIC or PRIVATE set
       * @enum {string}
       */
      visibility: "PUBLIC" | "PRIVATE";
      questionsList: components["schemas"]["CreateQuestionRequest"][];
    };
    CreateStudySetExcel: {
      studySetName: string;
      /**
       * @description BASIC only support PUBLIC, PRO can create PUBLIC or PRIVATE set
       * @enum {string}
       */
      visibility: "PUBLIC" | "PRIVATE";
    };
    LoginRequest: {
      idToken: string;
    };
    LoginResponse: {
      accessToken?: string;
      refreshToken?: string;
      userResponse?: components["schemas"]["UserResponse"];
    };
    SubscriptionResponse: {
      id?: string;
      subscriptionName?: string;
      description?: string;
      pricePerMonth?: number;
      pricePerYear?: number;
      supportedFeatures?: string;
      gptModel?: string;
      /** Format: int32 */
      gptLimit?: number;
    };
    BasicUserResponse: {
      /** Format: uuid */
      id?: string;
      email?: string;
      fullName?: string;
      feImageName?: string;
      /** @enum {string} */
      status?: "DELETED" | "SUCCEED";
      subscription?: components["schemas"]["UserSubscriptionResponse"];
    };
    UpgradeRequestResponse: {
      /** Format: int32 */
      id?: number;
      userResponse?: components["schemas"]["BasicUserResponse"];
      /** @enum {string} */
      paidType?: "NO" | "MONTHLY" | "YEARLY";
      /** @enum {string} */
      status?: "PENDING" | "SUCCEED";
    };
    BasicStudySetResponse: {
      /** Format: int32 */
      id?: number;
      studySetName?: string;
      feImageName?: string;
      creator?: components["schemas"]["CreatorResponse"];
      /** @enum {string} */
      visibility?: "PUBLIC" | "PRIVATE";
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /** Unban a user (only for ADMIN) */
  unbanUser: {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["GeneralResponse"];
        };
      };
    };
  };
  /** Get pomodoro clock settings of current user */
  getPomodoroClockOfCurrentUser: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["PomodoroResponse"];
        };
      };
    };
  };
  /** Update pomodoro clock settings of current user */
  updatePomodoroClockOfCurrentUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdatePomodoroRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["PomodoroResponse"];
        };
      };
    };
  };
  /** Get current logged in user */
  getCurrentUser: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  /** Update current logged in user */
  updateCurrentUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  /** Update avatar of current logged in user */
  updateAvatarOfCurrentUser: {
    requestBody?: {
      content: {
        "application/json": string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["GeneralResponse"];
        };
      };
    };
  };
  /** Ban a user (only for ADMIN) */
  banUser: {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["GeneralResponse"];
        };
      };
    };
  };
  /** Make request to upgrade subscription for a specific user (ONLY ADMIN) */
  upgradeSubscription: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpgradeSubscriptionRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  /** Cron Job server automatically calls this API to downgrade subscription after expiredDateTime */
  downgradeSubscription: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["DowngradeSubscriptionRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": boolean;
        };
      };
    };
  };
  /** Get study set by ID */
  getStudySetById: {
    parameters: {
      path: {
        study_set_id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StudySetResponse"];
        };
      };
    };
  };
  /** Update pre-exist study set (under development) */
  updateStudySet: {
    parameters: {
      path: {
        study_set_id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StudySetResponse"];
        };
      };
    };
  };
  /** Delete study set by ID */
  deleteStudySet: {
    parameters: {
      path: {
        study_set_id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["GeneralResponse"];
        };
      };
    };
  };
  /** Create or update note for a question of a study set (for current logged in user) */
  createNoteOfCurrentQuestionForCurrentUser: {
    parameters: {
      path: {
        question_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserQuestionNoteRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserQuestionNoteResponse"];
        };
      };
    };
  };
  /** Enter other user's referral code to get free dates using PRO Subscription */
  enterReferralCode: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ReferralCodeRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  /** Get all study sets */
  getAllStudySets: {
    parameters: {
      query?: {
        search?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["BasicStudySetResponse"][];
        };
      };
    };
  };
  /** Create new study set */
  createStudySet: {
    requestBody?: {
      content: {
        "application/json": {
          /** @description Send image as form data with key "image" */
          image: File;
          create_study_set_request: components["schemas"]["CreateStudySetRequest"];
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StudySetResponse"];
        };
      };
    };
  };
  /** Create new study set from excel format */
  createStudySetFromExcel: {
    requestBody?: {
      content: {
        "application/json": {
          /** @description Send image as form data with key "image" */
          image: string;
          create_study_set_request: components["schemas"]["CreateStudySetExcel"];
          /** Format: binary */
          excel: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StudySetResponse"];
        };
      };
    };
  };
  /** API for logging in via Google */
  loginUserViaGoogle: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["LoginResponse"];
        };
      };
    };
  };
  /** API for testing welcome users from server */
  welcomeUser: {
    parameters: {
      query: {
        username: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": string;
        };
      };
    };
  };
  redirect: {
    parameters: {
      query: {
        name: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** Get all users - students (only for ADMIN) */
  getAllUsers: {
    parameters: {
      query?: {
        status?: "DELETED" | "SUCCEED";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserResponse"][];
        };
      };
    };
  };
  /** Get user by user ID (only for ADMIN) */
  getUserById: {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  /** Get all subscriptions */
  getAllSubscription: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["SubscriptionResponse"][];
        };
      };
    };
  };
  /** Get subscription by ID */
  getSubscriptionById: {
    parameters: {
      path: {
        subscription_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["SubscriptionResponse"];
        };
      };
    };
  };
  /** Get upgrade request by ID (ONLY ADMIN) */
  getUpgradeRequestById: {
    parameters: {
      path: {
        upgrade_request_id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UpgradeRequestResponse"];
        };
      };
    };
  };
  /** Get all upgrade requests from students (ONLY ADMIN) */
  getAllUpgradeRequests: {
    parameters: {
      query?: {
        status?: "PENDING" | "SUCCEED";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UpgradeRequestResponse"][];
        };
      };
    };
  };
  /** Student requests to upgrade subscription when choosing to fulfill the payment */
  requestToUpgradeWithPayment: {
    parameters: {
      query: {
        paidType: "NO" | "MONTHLY" | "YEARLY";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["GeneralResponse"];
        };
      };
    };
  };
  /** Get all study sets of current user */
  getAllStudySetsOfCurrentUser: {
    parameters: {
      query?: {
        search?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["BasicStudySetResponse"][];
        };
      };
    };
  };
  /**
   * Get new Access token by Refresh token
   * @description Include refresh token as bearer token in request header to get new access token together with new refresh token
   */
  getNewAccessTokenFromRefreshToken: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["LoginResponse"];
        };
      };
    };
  };
  /** View public image */
  viewImageByImageName: {
    parameters: {
      path: {
        fe_image_name: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": string[];
        };
      };
    };
  };
}
