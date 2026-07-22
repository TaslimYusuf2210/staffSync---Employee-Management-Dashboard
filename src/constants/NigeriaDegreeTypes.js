const degreeTypes = {
  "tertiary_qualifications": [
    {
      "institution_type": "Universities",
      "qualifications": [
        {
          "abbreviation": "B.Sc.",
          "full_name": "Bachelor of Science",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "B.A.",
          "full_name": "Bachelor of Arts",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "B.Eng.",
          "full_name": "Bachelor of Engineering",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "B.Tech.",
          "full_name": "Bachelor of Technology",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "LL.B.",
          "full_name": "Bachelor of Laws",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "MBBS / MBChB",
          "full_name": "Bachelor of Medicine, Bachelor of Surgery",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "BDS",
          "full_name": "Bachelor of Dental Surgery",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "Pharm.D",
          "full_name": "Doctor of Pharmacy",
          "category": "Undergraduate / Professional Doctorate"
        },
        {
          "abbreviation": "B.Pharm.",
          "full_name": "Bachelor of Pharmacy",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "B.Ed.",
          "full_name": "Bachelor of Education",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "B.N.Sc.",
          "full_name": "Bachelor of Nursing Science",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "B.Agric.",
          "full_name": "Bachelor of Agriculture",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "B.MLS",
          "full_name": "Bachelor of Medical Laboratory Science",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "OD",
          "full_name": "Doctor of Optometry",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "DVM",
          "full_name": "Doctor of Veterinary Medicine",
          "category": "Undergraduate Professional Degree"
        },
        {
          "abbreviation": "B.Arch.",
          "full_name": "Bachelor of Architecture",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "B.URP",
          "full_name": "Bachelor of Urban and Regional Planning",
          "category": "Undergraduate Degree"
        },
        {
          "abbreviation": "PGD",
          "full_name": "Postgraduate Diploma",
          "category": "Postgraduate Qualification"
        },
        {
          "abbreviation": "M.Sc.",
          "full_name": "Master of Science",
          "category": "Postgraduate Academic Degree"
        },
        {
          "abbreviation": "M.A.",
          "full_name": "Master of Arts",
          "category": "Postgraduate Academic Degree"
        },
        {
          "abbreviation": "M.Eng.",
          "full_name": "Master of Engineering",
          "category": "Postgraduate Academic Degree"
        },
        {
          "abbreviation": "LL.M.",
          "full_name": "Master of Laws",
          "category": "Postgraduate Academic Degree"
        },
        {
          "abbreviation": "M.Ed.",
          "full_name": "Master of Education",
          "category": "Postgraduate Academic Degree"
        },
        {
          "abbreviation": "MBA",
          "full_name": "Master of Business Administration",
          "category": "Postgraduate Professional Degree"
        },
        {
          "abbreviation": "MPA",
          "full_name": "Master of Public Administration",
          "category": "Postgraduate Professional Degree"
        },
        {
          "abbreviation": "MPH",
          "full_name": "Master of Public Health",
          "category": "Postgraduate Professional Degree"
        },
        {
          "abbreviation": "MSW",
          "full_name": "Master of Social Work",
          "category": "Postgraduate Professional Degree"
        },
        {
          "abbreviation": "MURP",
          "full_name": "Master of Urban and Regional Planning",
          "category": "Postgraduate Professional Degree"
        },
        {
          "abbreviation": "M.Phil.",
          "full_name": "Master of Philosophy",
          "category": "Postgraduate Research Degree"
        },
        {
          "abbreviation": "Ph.D.",
          "full_name": "Doctor of Philosophy",
          "category": "Doctoral Degree"
        }
      ]
    },
    {
      "institution_type": "Polytechnics & Monotechnics",
      "qualifications": [
        {
          "abbreviation": "ND",
          "full_name": "National Diploma",
          "category": "Sub-Degree Diploma"
        },
        {
          "abbreviation": "HND",
          "full_name": "Higher National Diploma",
          "category": "Higher Diploma (Degree Equivalent)"
        },
        {
          "abbreviation": "Post-HND",
          "full_name": "Post-Higher National Diploma",
          "category": "Postgraduate Professional Diploma"
        }
      ]
    },
    {
      "institution_type": "Colleges of Education",
      "qualifications": [
        {
          "abbreviation": "NCE",
          "full_name": "Nigeria Certificate in Education",
          "category": "Basic Teaching Qualification / Diploma"
        },
        {
          "abbreviation": "PDE / PGDE",
          "full_name": "Professional Diploma in Education / Post-Graduate Diploma in Education",
          "category": "Postgraduate / Professional Diploma"
        },
        {
          "abbreviation": "B.Ed.",
          "full_name": "Bachelor of Education",
          "category": "Undergraduate Degree (In affiliation with accredited universities)"
        }
      ]
    },
    {
      "institution_type": "Colleges of Nursing Sciences & Health Technology",
      "qualifications": [
        {
          "abbreviation": "RN",
          "full_name": "Registered Nurse Certificate",
          "category": "Professional Nursing License / Diploma"
        },
        {
          "abbreviation": "RM",
          "full_name": "Registered Midwife Certificate",
          "category": "Professional Midwifery License / Diploma"
        },
        {
          "abbreviation": "RPN",
          "full_name": "Registered Psychiatric Nurse Certificate",
          "category": "Professional Specialty Certificate"
        },
        {
          "abbreviation": "B.N.Sc.",
          "full_name": "Bachelor of Nursing Science",
          "category": "Undergraduate Degree (Offered by accredited Colleges converted to degree-awarding institutions or affiliated with universities)"
        },
        {
          "abbreviation": "ND / HND Nursing",
          "full_name": "National Diploma / Higher National Diploma in Nursing",
          "category": "Technical Nursing Qualification"
        }
      ]
    },
    {
      "institution_type": "Innovation Enterprise Institutions (IEIs) & Vocational Colleges",
      "qualifications": [
        {
          "abbreviation": "NID",
          "full_name": "National Innovation Diploma",
          "category": "Vocational Diploma (ND Equivalent)"
        },
        {
          "abbreviation": "HNID",
          "full_name": "Higher National Innovation Diploma",
          "category": "Vocational Diploma (HND Equivalent)"
        },
        {
          "abbreviation": "NVQ",
          "full_name": "National Vocational Qualification",
          "category": "Skill Certification"
        }
      ]
    }
  ]
};

export default degreeTypes;