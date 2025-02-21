import image from "./../../public/image_3.png";

const sampleEmails = [
  {
    _id: "1",
    emailId: "email001",
    subject: "Welcome to Our Service",
    subBody: "Thank you for signing up!",
    body: "Hello John,\n\nThank you for signing up. We're excited to have you on board. Let us know if you need anything.\n\nBest regards,\nTeam",
    preview: "Thank you for signing up! We're excited to have you...",
    image: image,
    time: "09:00 AM",
    user: {
      username: "Team Support",
      emailAddress: "support@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "2",
    emailId: "email002",
    subject: "Your Invoice is Ready",
    subBody: "Invoice for your recent order",
    body: "Dear Customer,\n\nPlease find attached the invoice for your recent order. Thank you for shopping with us.\n\nRegards,\nBilling Department",
    preview: "Please find attached the invoice for your recent order...",
    image: image,
    time: "10:15 AM",
    user: {
      username: "Billing Department",
      emailAddress: "billing@example.com"
    },
    isStarred: true,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "3",
    emailId: "email003",
    subject: "Meeting Reminder",
    subBody: "Reminder for our upcoming meeting",
    body: "Hi Team,\n\nThis is a reminder for our meeting scheduled tomorrow at 10 AM. Please be prepared with your reports.\n\nThanks,\nManager",
    preview: "This is a reminder for our meeting scheduled tomorrow...",
    image: "",
    time: "08:45 AM",
    user: {
      username: "Manager",
      emailAddress: "manager@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "4",
    emailId: "email004",
    subject: "Project Update",
    subBody: "Latest update on the project",
    body: "Hello,\n\nI wanted to share the latest update on our project. We have completed the initial phase and are moving to the next step.\n\nBest,\nProject Lead",
    preview: "I wanted to share the latest update on our project...",
    image: "",
    time: "11:30 AM",
    user: {
      username: "Project Lead",
      emailAddress: "lead@example.com"
    },
    isStarred: true,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: true
  },
  {
    _id: "5",
    emailId: "email005",
    subject: "Weekly Newsletter",
    subBody: "Your weekly news roundup",
    body: "Dear Subscriber,\n\nWelcome to our weekly newsletter. This week, we cover the latest trends in tech, business, and more.\n\nEnjoy reading!\nEditorial Team",
    preview: "Welcome to our weekly newsletter. This week, we cover...",
    image: "",
    time: "07:20 AM",
    user: {
      username: "Editorial Team",
      emailAddress: "newsletter@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "6",
    emailId: "email006",
    subject: "Account Verification",
    subBody: "Verify your email address",
    body: "Hello,\n\nPlease verify your email address by clicking the link below. Thank you for joining our community.\n\nBest,\nAdmin",
    preview: "Please verify your email address by clicking the link...",
    image: "",
    time: "12:05 PM",
    user: {
      username: "Admin",
      emailAddress: "admin@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: true,
    isSent: false,
    read: false
  },
  {
    _id: "7",
    emailId: "email007",
    subject: "Password Reset Request",
    subBody: "Instructions to reset your password",
    body: "Hi,\n\nWe received a request to reset your password. Click the link below to proceed. If you didn't request this, please ignore this email.\n\nRegards,\nSupport",
    preview: "We received a request to reset your password...",
    image: "",
    time: "01:30 PM",
    user: {
      username: "Support",
      emailAddress: "support@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: true
  },
  {
    _id: "8",
    emailId: "email008",
    subject: "Invitation to Webinar",
    subBody: "Join our upcoming webinar",
    body: "Dear Participant,\n\nWe are pleased to invite you to our upcoming webinar on the latest industry trends. Register now to secure your spot.\n\nCheers,\nEvent Team",
    preview: "We are pleased to invite you to our upcoming webinar on the latest industry trends...",
    image: "",
    time: "03:10 PM",
    user: {
      username: "Event Team",
      emailAddress: "events@example.com"
    },
    isStarred: true,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "9",
    emailId: "email009",
    subject: "Happy Birthday!",
    subBody: "Celebrate with a special offer",
    body: "Hi there,\n\nHappy Birthday! To celebrate, we’re offering you a special discount on your next purchase. Enjoy your day!\n\nBest wishes,\nThe Team",
    preview: "Happy Birthday! To celebrate, we’re offering you a special discount...",
    image: "",
    time: "04:45 PM",
    user: {
      username: "The Team",
      emailAddress: "team@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: true
  },
  {
    _id: "10",
    emailId: "email010",
    subject: "Service Downtime Notification",
    subBody: "Important update on service availability",
    body: "Dear User,\n\nWe regret to inform you that our service will be down for maintenance on Saturday, 2 AM to 4 AM. We apologize for the inconvenience.\n\nRegards,\nOperations",
    preview: "We regret to inform you that our service will be down for maintenance...",
    image: "",
    time: "05:00 PM",
    user: {
      username: "Operations",
      emailAddress: "ops@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "11",
    emailId: "email011",
    subject: "Feedback Request",
    subBody: "We’d love to hear your thoughts",
    body: "Hi,\n\nWe constantly strive to improve our service. Please take a moment to provide feedback on your recent experience.\n\nThank you,\nCustomer Success",
    preview: "We constantly strive to improve our service. Please take a moment to provide feedback...",
    image: "",
    time: "06:15 PM",
    user: {
      username: "Customer Success",
      emailAddress: "cs@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "12",
    emailId: "email012",
    subject: "New Feature Announcement",
    subBody: "Discover our latest feature",
    body: "Dear User,\n\nWe're excited to announce a new feature that will enhance your experience. Check out the details on our blog.\n\nCheers,\nProduct Team",
    preview: "We're excited to announce a new feature that will enhance your experience...",
    image: "https://example.com/images/feature.png",
    time: "07:00 PM",
    user: {
      username: "Product Team",
      emailAddress: "product@example.com"
    },
    isStarred: true,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "13",
    emailId: "email013",
    subject: "Reminder: Submit Your Report",
    subBody: "Don't forget to submit your weekly report",
    body: "Hello,\n\nThis is a reminder to submit your weekly report by the end of today. Let us know if you need any help.\n\nThanks,\nTeam Lead",
    preview: "This is a reminder to submit your weekly report by the end of today...",
    image: "",
    time: "08:30 PM",
    user: {
      username: "Team Lead",
      emailAddress: "lead@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: true
  },
  {
    _id: "14",
    emailId: "email014",
    subject: "Subscription Renewal",
    subBody: "Your subscription is about to expire",
    body: "Dear Subscriber,\n\nYour subscription is about to expire. Please renew it to continue enjoying our services.\n\nRegards,\nSubscription Team",
    preview: "Your subscription is about to expire. Please renew it to continue enjoying our services...",
    image: "",
    time: "09:10 PM",
    user: {
      username: "Subscription Team",
      emailAddress: "subscribe@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: true,
    isSent: false,
    read: false
  },
  {
    _id: "15",
    emailId: "email015",
    subject: "Contest Winner Announcement",
    subBody: "Congratulations to our winner",
    body: "Hi,\n\nWe are thrilled to announce the winner of our contest. Congratulations to the lucky winner!\n\nCheers,\nContest Team",
    preview: "We are thrilled to announce the winner of our contest...",
    image: "https://example.com/images/contest.png",
    time: "10:00 PM",
    user: {
      username: "Contest Team",
      emailAddress: "contest@example.com"
    },
    isStarred: true,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "16",
    emailId: "email016",
    subject: "Invitation: Join Our Beta Program",
    subBody: "Get early access to our new features",
    body: "Dear User,\n\nWe invite you to join our beta program and test out our new features before the official launch. Your feedback is valuable!\n\nThank you,\nBeta Team",
    preview: "We invite you to join our beta program and test out our new features...",
    image: "",
    time: "10:30 PM",
    user: {
      username: "Beta Team",
      emailAddress: "beta@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "17",
    emailId: "email017",
    subject: "Security Alert",
    subBody: "Unusual activity detected on your account",
    body: "Hi,\n\nWe have detected unusual activity on your account. Please review your recent actions and change your password if necessary.\n\nStay safe,\nSecurity Team",
    preview: "We have detected unusual activity on your account. Please review your recent actions...",
    image: "",
    time: "11:45 PM",
    user: {
      username: "Security Team",
      emailAddress: "security@example.com"
    },
    isStarred: true,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "18",
    emailId: "email018",
    subject: "Order Confirmation",
    subBody: "Your order has been confirmed",
    body: "Dear Customer,\n\nThank you for your purchase! Your order has been confirmed and will be processed shortly.\n\nRegards,\nOrder Team",
    preview: "Thank you for your purchase! Your order has been confirmed...",
    image: "https://example.com/images/order.png",
    time: "12:30 AM",
    user: {
      username: "Order Team",
      emailAddress: "orders@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "19",
    emailId: "email019",
    subject: "Service Feedback",
    subBody: "We value your opinion",
    body: "Hello,\n\nWe would love to hear your feedback on our service. Please take a few minutes to complete our survey.\n\nThank you,\nFeedback Team",
    preview: "We would love to hear your feedback on our service...",
    image: "",
    time: "01:00 AM",
    user: {
      username: "Feedback Team",
      emailAddress: "feedback@example.com"
    },
    isStarred: false,
    isTrashed: true,
    isDraft: false,
    isSent: true,
    read: false
  },
  {
    _id: "20",
    emailId: "email020",
    subject: "New Partnership Announcement",
    subBody: "Exciting news about our new partner",
    body: "Dear Partner,\n\nWe are excited to announce our new partnership with XYZ Corp. This collaboration will bring new opportunities and innovations.\n\nBest regards,\nCorporate Relations",
    preview: "We are excited to announce our new partnership with XYZ Corp...",
    image: "https://example.com/images/partnership.png",
    time: "02:15 AM",
    user: {
      username: "Corporate Relations",
      emailAddress: "corp@example.com"
    },
    isStarred: false,
    isTrashed: false,
    isDraft: false,
    isSent: true,
    read: false
  }
];

export default sampleEmails;
