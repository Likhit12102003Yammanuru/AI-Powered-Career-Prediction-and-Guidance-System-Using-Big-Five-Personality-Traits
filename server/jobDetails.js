const jobDetails = {
  // 1. Creative
  "Creative & Artistic": {
    description:
      "Roles centered around creativity, expression, imagination, and innovation.",
    jobNature: "Flexible, project-based, idea-driven work.",
    responsibilities: [
      "Creating original artistic or conceptual work",
      "Experimenting with ideas, styles, or tools",
      "Collaborating with creative teams",
      "Producing visually or conceptually unique output"
    ],
    examples: [
      "Creative Writer",
      "Artist",
      "Graphic Illustrator",
      "Content Creator",
      "Creative Strategist"
    ],
    workEnvironment:
      "Studios, creative agencies, media companies, freelance setups.",
    growthPath: ["Art Director", "Creative Director", "Innovation Lead"],
    reasoning:
      "High Openness + lower rigidity → strong creativity and originality."
  },

  // 2. Technical & Analytical
  "Technical & Analytical": {
    description:
      "Roles requiring logical reasoning, problem-solving, and structured thinking.",
    jobNature: "Highly analytical tasks involving systems, engineering, or data.",
    responsibilities: [
      "Solving technical challenges",
      "Building or improving systems",
      "Running simulations or data analyses",
      "Creating structured documentation"
    ],
    examples: [
      "Software Developer",
      "Mechanical Engineer",
      "Data Analyst",
      "Systems Engineer",
      "AI Developer"
    ],
    workEnvironment: "Tech teams, engineering firms, labs, remote tech roles.",
    growthPath: ["Tech Lead", "Engineering Manager", "Data Architect"],
    reasoning:
      "High Conscientiousness + medium/high Openness → strong structured problem solving."
  },

  // 3. Social, Marketing, Communication
  "Social, Marketing & Communication": {
    description:
      "People-focused roles involving persuasion, communication, and social engagement.",
    jobNature: "Dynamic environments with frequent human interaction.",
    responsibilities: [
      "Presenting and communicating ideas",
      "Marketing or promoting products",
      "Building relationships with clients or audiences",
      "Collaborating with teams"
    ],
    examples: [
      "Marketing Manager",
      "Sales Executive",
      "Public Relations Officer",
      "Social Media Manager"
    ],
    workEnvironment: "Marketing teams, agencies, corporate teams.",
    growthPath: ["Marketing Lead", "Sales Director", "Brand Manager"],
    reasoning:
      "High Extraversion + Agreeableness → strong communication and persuasion."
  },

  // 4. Leadership
  "Leadership & Management": {
    description:
      "Roles requiring interpersonal strength, strategy, and executive decision-making.",
    jobNature: "Team leadership, operational planning, and responsibility-heavy roles.",
    responsibilities: [
      "Managing teams and operations",
      "Setting goals and strategies",
      "Leading meetings and initiatives",
      "Ensuring project delivery"
    ],
    examples: [
      "Project Manager",
      "Operations Manager",
      "Product Manager",
      "Team Leader"
    ],
    workEnvironment: "Corporate offices, business units, tech/product teams.",
    growthPath: ["Director", "Head of Operations", "VP/Executive"],
    reasoning:
      "High Extraversion + High Conscientiousness + Low Neuroticism → strong leadership potential."
  },

  // 5. Research & Independent Work
  "Research & Independent Work": {
    description:
      "Analytical, deep-focus roles requiring independent thought and investigation.",
    jobNature:
      "Structured or semi-structured inquiry, experimentation, and analysis.",
    responsibilities: [
      "Conducting research or experiments",
      "Analyzing complex datasets",
      "Writing papers or reports",
      "Working independently on long-term projects"
    ],
    examples: [
      "Research Scientist",
      "Academic Researcher",
      "Data Researcher",
      "Policy Analyst"
    ],
    workEnvironment: "Universities, labs, think tanks, remote research roles.",
    growthPath: ["Senior Researcher", "Professor", "Principal Scientist"],
    reasoning:
      "High Openness + Low Extraversion → strong independent analytical ability."
  },

  // 6. Support / Healthcare
  "Support, Healthcare & Service": {
    description:
      "Empathy-driven roles focused on helping, supporting, and improving others' well-being.",
    responsibilities: [
      "Providing medical or emotional support",
      "Following structured care protocols",
      "Supporting patient or client needs",
      "Coordinating services"
    ],
    examples: ["Nurse", "Care Coordinator", "Physiotherapist", "Support Specialist"],
    reasoning:
      "High Agreeableness + Moderate/High Conscientiousness → strong caregiving and reliability."
  },

  // 7. Practical / Routine / Operational
  "Practical / Routine / Operational": {
    description:
      "Stable, consistent work involving predictable procedures and hands-on tasks.",
    responsibilities: [
      "Following structured workflows",
      "Managing repetitive or procedural tasks",
      "Operating tools or equipment",
      "Ensuring consistent output"
    ],
    examples: [
      "Data Entry Operator",
      "Factory Worker",
      "Technician",
      "Warehouse Operator"
    ],
    reasoning:
      "Low Openness + Low Extraversion → thrives in predictable, low-social environments."
  },

  // 8. Generalist
  Generalist: {
    description:
      "Broad roles suited for mixed or balanced personality types.",
    responsibilities: [
      "Supporting daily operations",
      "Interacting with customers or colleagues",
      "Handling varied tasks"
    ],
    examples: ["Customer Support", "Office Assistant", "Retail Associate"],
    reasoning:
      "Balanced or unclear traits → adaptable across multiple light-duty roles."
  }
};

module.exports = jobDetails;
