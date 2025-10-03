export interface MilestoneItem {
  title: string
  description: string
  image?: string
  link?: string
}

export interface MilestoneYear {
  year: string
  items: MilestoneItem[]
}

export const milestonesData: MilestoneYear[] = [
  {
    year: "2019",
    items: [
      {
        title: "Optimal Mental Health Debut",
        description: "Introducing a platform dedicated to promoting mental well-being and awareness in Ibadan, Lagos and Abuja.",
        image: "/milestones/optimal-debut.png",
      },
      {
        title: "Asido Campus Network Launched",
        description: "Pioneering student-led mental health advocacy at the University of Ibadan.",
        image: "/milestones/campus-network.jpg",
      },
      {
        title: "Community Engagement Series Begins",
        description: "First interactive monthly series fostering dialogue and education on mental health.",
        link: "#Community"
      }
    ]
  },
  {
    year: "2020",
    items: [
      {
        title: "Unashamed Campaign Launched",
        description: "Challenging stigma and empowering open conversations about mental health.",
        image: "/milestones/unashamed.jpg",
        link: "#unashamed"
      },
      {
        title: "LIMI Africa Storytelling Series Kicks Off",
        description: "Sharing real stories to amplify voices and lived experiences in mental health.",
        image: "/milestones/limi-logo.png",
        link: "#limi"
      },
      {
        title: "Emergency Helpline Inaugurated",
        description: "Launching a lifesaving support line for psychosocial emergencies.",
        link: "#Emergency"
      }
    ]
  },
  {
    year: "2021",
    items: [
      {
        title: "Project Hope Commences",
        description: "Providing targeted support and hope to those facing mental health challenges.",
        link: "#Project"
      },
      {
        title: "First Suicide Prevention Walk",
        description: "Uniting the community to raise awareness and advocate for prevention.",
        image: "/milestones/prevention-walk.jpg",
      },
      {
        title: "Inaugural JAME Competition",
        description: "Empowering youth through mental health-themed creativity and advocacy.",
        image: "/milestones/jame-competition.jpg",
      },
      {
        title: "Donate-a-Book Drive Launched",
        description: "Promoting knowledge-sharing and mental health education through books.",
        image: "/milestones/book-drive.jpg",
      }
    ]
  },
  {
    year: "2022",
    items: [
      {
        title: "Mindset Radio Show Goes Live",
        description: "Weekly conversations on mental health reaching a broader audience.",
        image: "/milestones/mindset-radio.jpg",
        link: "#Mindset"
      }
    ]
  },
  {
    year: "2023",
    items: [
      {
        title: "Mental Health Bill Passed",
        description: "Successfully advocating for the historic passing of Nigeria's Mental Health Bill.",
      },
      {
        title: "Lagos State Recognition",
        description: "Honored for outstanding contributions to community mental health and advocacy.",
        image: "/milestones/state-recognition.jpg",
        link: "#Lagos"
      }
    ]
  },
  {
    year: "2024",
    items: [
      {
        title: "ACAMH LMICs Innovation Award",
        description: "Recognized internationally for innovation in mental health research and practice.",
        image: "/milestones/inovation-award.png",
        link: "#Innovation"
      },
      {
        title: "Most Outstanding Student Association",
        description: "Asido Campus Network honored for exceptional impact on Nigerian campuses.",
        image: "/milestones/student-association.jpg",
        link: "#Association"
      },
      {
        title: "National Suicide Prevention Conference",
        description: "Bringing stakeholders together in Abuja to advance prevention efforts nationwide.",
        image: "/milestones/conference.jpg",
        link: "#conference"
      },
      {
        title: "Advocacy Visit to Attorney General",
        description: "Campaigning for the decriminalization of attempted suicide in Nigeria.",
        image: "/milestones/advocacy-visit.png",
      },
      {
        title: "Public Hearing Mobilization",
        description: "Engaging the public and submitting a formal memorandum to influence policy.",
        link: "#Mobilization"
      },
      {
        title: "Partnership With Lifeline International",
        description: "Forging global collaboration to strengthen crisis intervention and support.",
        image: "/milestones/partnership.png",
        link: "#partnership"
      }
    ]
  }
]