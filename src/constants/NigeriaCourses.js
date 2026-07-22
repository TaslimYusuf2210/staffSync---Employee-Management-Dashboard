const courses = {
  "country": "Nigeria",
  "regulatory_body": "National Universities Commission (NUC)",
  "standard_framework": "Core Curriculum and Minimum Academic Standards (CCMAS)",
  "total_faculties": 17,
  "faculties": [
    {
      "faculty_id": "ADM",
      "faculty_name": "Administration & Management Sciences",
      "courses": [
        {"code": "ACC", "name": "Accounting", "degree": "B.Sc."},
        {"code": "ACT", "name": "Actuarial Science", "degree": "B.Sc."},
        {"code": "BFN", "name": "Banking and Finance", "degree": "B.Sc."},
        {"code": "BUS", "name": "Business Administration", "degree": "B.Sc."},
        {"code": "CEM", "name": "Cooperative Economics and Management", "degree": "B.Sc."},
        {"code": "ENT", "name": "Entrepreneurship", "degree": "B.Sc."},
        {"code": "HTM", "name": "Hospitality and Tourism Management", "degree": "B.Sc."},
        {"code": "IRPM", "name": "Industrial Relations and Human Resource Management", "degree": "B.Sc."},
        {"code": "INS", "name": "Insurance", "degree": "B.Sc."},
        {"code": "MKT", "name": "Marketing", "degree": "B.Sc."},
        {"code": "PRM", "name": "Project Management", "degree": "B.Sc."},
        {"code": "PAD", "name": "Public Administration", "degree": "B.Sc."},
        {"code": "SCM", "name": "Supply Chain and Logistics Management", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "AGR",
      "faculty_name": "Agriculture & Agricultural Sciences",
      "courses": [
        {"code": "AGS", "name": "Agricultural Science (Pure / General)", "degree": "B.Agric."},
        {"code": "AGE", "name": "Agricultural Economics", "degree": "B.Agric."},
        {"code": "AGX", "name": "Agricultural Extension and Rural Development", "degree": "B.Agric."},
        {"code": "ANS", "name": "Animal Science & Animal Production", "degree": "B.Agric."},
        {"code": "CPS", "name": "Crop Science / Agronomy / Plant Protection", "degree": "B.Agric."},
        {"code": "FST", "name": "Food Science and Technology", "degree": "B.Sc. / B.Tech."},
        {"code": "FSH", "name": "Fisheries and Aquaculture", "degree": "B.Fisheries / B.Agric."},
        {"code": "FOR", "name": "Forestry and Wildlife Management", "degree": "B.Forestry / B.Agric."},
        {"code": "HND", "name": "Human Nutrition and Dietetics", "degree": "B.Sc."},
        {"code": "HOR", "name": "Horticulture and Landscape Management", "degree": "B.Agric."},
        {"code": "SLS", "name": "Soil Science and Land Resources Management", "degree": "B.Agric."},
        {"code": "WLM", "name": "Ecotourism and Wildlife Management", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "ART",
      "faculty_name": "Arts & Humanities",
      "courses": [
        {"code": "ARA", "name": "Arabic Studies", "degree": "B.A."},
        {"code": "ARC", "name": "Archaeology and Heritage Studies", "degree": "B.A."},
        {"code": "CRS", "name": "Christian Religious Studies", "degree": "B.A."},
        {"code": "CLA", "name": "Communication and Language Arts", "degree": "B.A."},
        {"code": "ENG", "name": "English Language and Literary Studies", "degree": "B.A."},
        {"code": "FAA", "name": "Fine and Applied Arts", "degree": "B.A."},
        {"code": "FRE", "name": "French and International Studies", "degree": "B.A."},
        {"code": "HIS", "name": "History and Diplomatic Studies", "degree": "B.A."},
        {"code": "ISS", "name": "Islamic Studies", "degree": "B.A."},
        {"code": "LIN", "name": "Linguistics (Igbo, Yoruba, Hausa, French, German)", "degree": "B.A."},
        {"code": "MUS", "name": "Music", "degree": "B.A."},
        {"code": "PHI", "name": "Philosophy", "degree": "B.A."},
        {"code": "THA", "name": "Theatre, Film and Performing Arts", "degree": "B.A."}
      ]
    },
    {
      "faculty_id": "BIO",
      "faculty_name": "Biological Sciences",
      "courses": [
        {"code": "BCH", "name": "Biochemistry", "degree": "B.Sc."},
        {"code": "BIO", "name": "Biology (Pure / General)", "degree": "B.Sc."},
        {"code": "BOT", "name": "Plant Biology and Biotechnology", "degree": "B.Sc."},
        {"code": "GEN", "name": "Cell Biology and Genetics", "degree": "B.Sc."},
        {"code": "MBN", "name": "Marine Biology and Oceanography", "degree": "B.Sc."},
        {"code": "MGB", "name": "Microbiology", "degree": "B.Sc."},
        {"code": "PAE", "name": "Parasitology and Entomology", "degree": "B.Sc."},
        {"code": "ZOO", "name": "Zoology and Environmental Biology", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "CIS",
      "faculty_name": "Computing & Information Technology",
      "courses": [
        {"code": "ART", "name": "Artificial Intelligence", "degree": "B.Sc."},
        {"code": "CSC", "name": "Computer Science", "degree": "B.Sc."},
        {"code": "CYB", "name": "Cyber Security", "degree": "B.Sc."},
        {"code": "DAT", "name": "Data Science", "degree": "B.Sc."},
        {"code": "INF", "name": "Information Technology", "degree": "B.Sc."},
        {"code": "IFS", "name": "Information Systems", "degree": "B.Sc."},
        {"code": "LIS", "name": "Library and Information Science", "degree": "B.LIS / B.Sc."},
        {"code": "SEN", "name": "Software Engineering", "degree": "B.Sc."},
        {"code": "TEL_SCI", "name": "Telecommunication Science", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "EDU",
      "faculty_name": "Education",
      "courses": [
        {"code": "EDA", "name": "Educational Management and Leadership", "degree": "B.Ed."},
        {"code": "EDC", "name": "Guidance and Counselling", "degree": "B.Ed."},
        {"code": "ECE", "name": "Early Childhood Education", "degree": "B.Ed."},
        {"code": "PED", "name": "Primary Education Studies", "degree": "B.Ed."},
        {"code": "SPE", "name": "Special Education", "degree": "B.Ed."},
        {"code": "AED", "name": "Adult and Non-Formal Education", "degree": "B.Ed."},
        {"code": "BED", "name": "Business Education", "degree": "B.Ed."},
        {"code": "TED", "name": "Technology / Vocational Education", "degree": "B.Sc.(Ed)"},
        {"code": "HKE", "name": "Human Kinetics and Sports Science", "degree": "B.Sc.(Ed)"},
        {"code": "HED", "name": "Health Education", "degree": "B.Sc.(Ed)"},
        {"code": "E_BIO", "name": "Education and Biology", "degree": "B.Sc.(Ed)"},
        {"code": "E_CHM", "name": "Education and Chemistry", "degree": "B.Sc.(Ed)"},
        {"code": "E_MTH", "name": "Education and Mathematics", "degree": "B.Sc.(Ed)"},
        {"code": "E_PHY", "name": "Education and Physics", "degree": "B.Sc.(Ed)"},
        {"code": "E_ENG", "name": "Education and English Language", "degree": "B.A.(Ed)"},
        {"code": "E_HIS", "name": "Education and History", "degree": "B.A.(Ed)"},
        {"code": "E_CRS", "name": "Education and Christian Religious Studies", "degree": "B.Ed."},
        {"code": "E_ECO", "name": "Education and Economics", "degree": "B.Sc.(Ed)"},
        {"code": "E_POS", "name": "Education and Political Science", "degree": "B.Sc.(Ed)"},
        {"code": "E_GEO", "name": "Education and Geography", "degree": "B.Sc.(Ed)"},
        {"code": "E_CSC", "name": "Education and Computer Science", "degree": "B.Sc.(Ed)"}
      ]
    },
    {
      "faculty_id": "ENG",
      "faculty_name": "Engineering & Technology",
      "courses": [
        {"code": "ABE", "name": "Agricultural and Environmental Engineering", "degree": "B.Eng. / B.Tech."},
        {"code": "AER", "name": "Aeronautical and Aerospace Engineering", "degree": "B.Eng."},
        {"code": "AUT", "name": "Automotive Engineering", "degree": "B.Eng."},
        {"code": "BME", "name": "Biomedical Engineering", "degree": "B.Eng."},
        {"code": "CHE", "name": "Chemical Engineering", "degree": "B.Eng."},
        {"code": "CVE", "name": "Civil Engineering", "degree": "B.Eng."},
        {"code": "CPE", "name": "Computer Engineering", "degree": "B.Eng."},
        {"code": "EEE", "name": "Electrical and Electronics Engineering", "degree": "B.Eng."},
        {"code": "EVE", "name": "Environmental Engineering", "degree": "B.Eng."},
        {"code": "FDE", "name": "Food Engineering", "degree": "B.Eng. / B.Tech."},
        {"code": "GMT", "name": "Geomatics Engineering", "degree": "B.Eng."},
        {"code": "IND", "name": "Industrial and Production Engineering", "degree": "B.Eng."},
        {"code": "MAR", "name": "Marine Engineering", "degree": "B.Eng."},
        {"code": "MEE", "name": "Mechanical Engineering", "degree": "B.Eng."},
        {"code": "MME", "name": "Metallurgical and Materials Engineering", "degree": "B.Eng."},
        {"code": "MRE", "name": "Mechatronics and Robotics Engineering", "degree": "B.Eng."},
        {"code": "MNE", "name": "Mining Engineering", "degree": "B.Eng."},
        {"code": "NUE", "name": "Nuclear Engineering", "degree": "B.Eng."},
        {"code": "PTE", "name": "Petroleum and Gas Engineering", "degree": "B.Eng."},
        {"code": "PME", "name": "Polymer and Textile Engineering", "degree": "B.Eng."},
        {"code": "STE", "name": "Structural Engineering", "degree": "B.Eng."},
        {"code": "SYS", "name": "Systems Engineering", "degree": "B.Eng."},
        {"code": "TCE", "name": "Telecommunication Engineering", "degree": "B.Eng. / B.Tech."},
        {"code": "WRE", "name": "Water Resources and Environmental Engineering", "degree": "B.Eng."}
      ]
    },
    {
      "faculty_id": "ENV",
      "faculty_name": "Environmental Sciences",
      "courses": [
        {"code": "ARC", "name": "Architecture", "degree": "B.Sc. / B.Arch."},
        {"code": "BLD", "name": "Building Technology", "degree": "B.Sc."},
        {"code": "EVM", "name": "Environmental Management and Toxicology", "degree": "B.Sc."},
        {"code": "EHS", "name": "Environmental Health Science", "degree": "B.Sc."},
        {"code": "ESM", "name": "Estate Management and Valuation", "degree": "B.Sc."},
        {"code": "SVG", "name": "Geoinformatics and Surveying", "degree": "B.Sc."},
        {"code": "LAE", "name": "Landscape Architecture", "degree": "B.Sc."},
        {"code": "QTS", "name": "Quantity Surveying", "degree": "B.Sc."},
        {"code": "URP", "name": "Urban and Regional Planning", "degree": "B.Sc. / B.URP"}
      ]
    },
    {
      "faculty_id": "LAW",
      "faculty_name": "Law",
      "courses": [
        {"code": "CML", "name": "Commercial and Industrial Law", "degree": "LL.B."},
        {"code": "IPL", "name": "International Law and Jurisprudence", "degree": "LL.B."},
        {"code": "PBL", "name": "Public and Private Law", "degree": "LL.B."},
        {"code": "ISL", "name": "Islamic Law / Sharia Law", "degree": "LL.B."},
        {"code": "CBL", "name": "Civil Law", "degree": "LL.B."}
      ]
    },
    {
      "faculty_id": "MED",
      "faculty_name": "Basic Medical & Clinical Sciences",
      "courses": [
        {"code": "ANA", "name": "Human Anatomy", "degree": "B.Sc."},
        {"code": "PHS", "name": "Human Physiology", "degree": "B.Sc."},
        {"code": "MBBS", "name": "Medicine and Surgery", "degree": "MBBS / MBChB"},
        {"code": "DEN", "name": "Dentistry and Dental Surgery", "degree": "BDS"},
        {"code": "MBN", "name": "Medical Biochemistry", "degree": "B.Sc."},
        {"code": "PTH", "name": "Pathology / Pharmacology", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "AHS",
      "faculty_name": "Allied Health Sciences",
      "courses": [
        {"code": "MLS", "name": "Medical Laboratory Science", "degree": "B.MLS"},
        {"code": "RAD", "name": "Medical Radiography and Radiological Science", "degree": "B.Rad. / B.Sc."},
        {"code": "PHT", "name": "Physiotherapy / Medical Rehabilitation", "degree": "B.MR / B.PT"},
        {"code": "NUR", "name": "Nursing Science", "degree": "B.N.Sc."},
        {"code": "PBH", "name": "Public Health", "degree": "B.Sc."},
        {"code": "OPT", "name": "Optometry", "degree": "OD"},
        {"code": "OCT", "name": "Occupational Therapy", "degree": "B.Sc."},
        {"code": "CHS", "name": "Community Health Science", "degree": "B.HLIS"},
        {"code": "SLT", "name": "Speech and Language Therapy", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "PHA",
      "faculty_name": "Pharmaceutical Sciences",
      "courses": [
        {"code": "FAR", "name": "Pharmacy", "degree": "Pharm.D / B.Pharm."},
        {"code": "PHT", "name": "Pharmaceutical Technology", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "PHY",
      "faculty_name": "Physical Sciences",
      "courses": [
        {"code": "CHM", "name": "Pure and Applied Chemistry", "degree": "B.Sc."},
        {"code": "ICH", "name": "Industrial Chemistry", "degree": "B.Sc."},
        {"code": "GEL", "name": "Geology and Petroleum Geosciences", "degree": "B.Sc."},
        {"code": "GPH", "name": "Geophysics", "degree": "B.Sc."},
        {"code": "MTH", "name": "Mathematics", "degree": "B.Sc."},
        {"code": "PHY", "name": "Physics and Industrial Physics", "degree": "B.Sc."},
        {"code": "STA", "name": "Statistics", "degree": "B.Sc."},
        {"code": "WSH", "name": "Water, Sanitation and Hygiene", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "SOC",
      "faculty_name": "Social Sciences",
      "courses": [
        {"code": "ECO", "name": "Economics", "degree": "B.Sc."},
        {"code": "GEO", "name": "Geography and Environmental Management", "degree": "B.Sc."},
        {"code": "POS", "name": "Political Science", "degree": "B.Sc."},
        {"code": "PSY", "name": "Psychology", "degree": "B.Sc."},
        {"code": "SOC", "name": "Sociology and Anthropology", "degree": "B.Sc."},
        {"code": "SWK", "name": "Social Work", "degree": "B.Sc."},
        {"code": "CSS", "name": "Criminology and Security Studies", "degree": "B.Sc."},
        {"code": "ISS", "name": "Intelligence and Security Studies", "degree": "B.Sc."},
        {"code": "IEF", "name": "Islamic Economics and Finance", "degree": "B.Sc."},
        {"code": "PCS", "name": "Peace, Conflict and Strategic Studies", "degree": "B.Sc."},
        {"code": "DEM", "name": "Demography and Social Statistics", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "CMS",
      "faculty_name": "Communication & Media Studies",
      "courses": [
        {"code": "MAC", "name": "Mass Communication", "degree": "B.Sc. / B.A."},
        {"code": "JOU", "name": "Journalism and Media Studies", "degree": "B.Sc."},
        {"code": "PRAD", "name": "Public Relations and Advertising", "degree": "B.Sc."},
        {"code": "BCS", "name": "Broadcasting", "degree": "B.Sc."},
        {"code": "FMC", "name": "Film and Multimedia Studies", "degree": "B.Sc."},
        {"code": "DMD", "name": "Development Communication", "degree": "B.Sc."}
      ]
    },
    {
      "faculty_id": "VET",
      "faculty_name": "Veterinary Medicine",
      "courses": [
        {"code": "VET", "name": "Veterinary Medicine", "degree": "DVM"}
      ]
    }
  ]
};

export default courses;