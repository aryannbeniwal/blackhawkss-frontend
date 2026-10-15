export type LegalDocument = {
  title: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  updated: "2026-10-15",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "This website is operated by Black Hawk Security Solution, a partnership business based at Old Thana Road, Near Anaj Mandi Gate No. 1, Samalkha, Panipat, Haryana 132101, India. This policy describes what information the website collects, why, and what we do with it.",
      ],
    },
    {
      heading: "Information you give us through forms",
      paragraphs: [
        "When you submit the Request a Quote, Contact or Careers form, we store the details you enter: your name, mobile number, email address and organisation if provided, the service or role you are interested in, your location, dates, personnel or experience details, and any requirements you describe.",
        "Alongside the form we record the date and time of submission, your consent to this policy, and a hashed form of your IP address together with your browser's user-agent string. These two technical values are used only to detect and block spam or abusive submissions.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use the information to respond to your enquiry or application, prepare a quotation, arrange a deployment or interview, and keep a record of the conversation. Enquiries are sent by email to the founders and stored in our enquiry system so they can be followed up.",
        "We do not sell, rent or trade your information, and we do not use it for marketing lists. If you later become a client or employee, the information you gave us forms part of that relationship's records.",
      ],
    },
    {
      heading: "Where it is stored",
      paragraphs: [
        "Form submissions are stored in a database on a server operated by Black Hawk Security Solution and in the email accounts of the founders. Access is limited to the founders and anyone they authorise for administration.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Enquiries and applications are retained for up to 24 months from the date of submission so that we can respond to follow-up questions and keep a record of quotations. We may delete them earlier if they are no longer needed.",
      ],
    },
    {
      heading: "WhatsApp, phone and email links",
      paragraphs: [
        "Links on this site that open WhatsApp, your phone dialler or your email application hand you over to those third-party services. What you send through them is governed by the respective provider's terms and privacy policy, not by this website.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "The website itself does not require cookies to function. If web analytics (such as Google Analytics) is enabled, it sets cookies to measure page views and form submissions in aggregate. You can block cookies in your browser without affecting the forms, phone or WhatsApp links.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can ask us to correct or delete the information you submitted at any time by writing to helloblackhawkss@gmail.com from the email address you provided, or by calling the office on +91 88010 00054. We will confirm once the request has been actioned.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If our processing changes, this page will be updated and the date at the top revised. Continued use of the forms after a change means you accept the updated policy.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  updated: "2026-10-15",
  sections: [
    {
      heading: "About this website",
      paragraphs: [
        "This website is published by Black Hawk Security Solution, Samalkha, Panipat, Haryana. The information on it describes the services we offer and the organisations we have served. It is general information and does not form a contract.",
      ],
    },
    {
      heading: "Quotations and engagements",
      paragraphs: [
        "Any figure, headcount or timeline discussed through the website, WhatsApp or phone is indicative until confirmed in a written quotation accepted by both parties. Deployments begin only after that confirmation and on the terms set out in it.",
        "Quotations are based on the information you provide. If the site, venue, dates or headcount change, the quotation may change.",
      ],
    },
    {
      heading: "Scope of services",
      paragraphs: [
        "Our services are provided subject to applicable Indian laws and the licensing and regulatory requirements that apply to private security agencies. Personal security officer assignments, including any armed requirement, are arranged only where applicable legal requirements are met.",
        "We advertise only services we currently accept. We do not guarantee any particular outcome; security personnel reduce risk and respond to incidents but cannot eliminate risk.",
      ],
    },
    {
      heading: "Client register and portfolio",
      paragraphs: [
        "Organisations named on this website are those recorded in our client register as having engaged our services. Listing an organisation does not mean it is a current client, sponsor or partner, and does not imply endorsement.",
      ],
    },
    {
      heading: "Use of the website and forms",
      paragraphs: [
        "You agree to submit accurate information and not to use the forms for spam, testing or any unlawful purpose. We may block submissions that appear automated or abusive.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The Black Hawk name, logo and the content of this website belong to Black Hawk Security Solution and may not be copied or used without permission.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Any dispute arising from the use of this website or our services is subject to the jurisdiction of the courts at Panipat, Haryana.",
      ],
    },
  ],
};
