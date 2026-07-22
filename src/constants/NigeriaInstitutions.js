const institutions = [
  {
    "name": "Abia State Polytechnic, Aba",
    "value": "abia state polytechnic aba",
    "abb": "ABIAPOLY"
  },
  {
    "name": "Abia State University, Uturu",
    "value": "abia state university uturu",
    "abb": "ABSU"
  },
  {
    "name": "Abubakar Tatari Ali Polytechnic, Bauchi",
    "value": "abubakar tatari ali polytechnic bauchi",
    "abb": "ATAPOLY"
  },
  {
    "name": "Abubakar Tafawa Balewa University, Bauchi",
    "value": "abubakar tafawa balewa university bauchi",
    "abb": "ATBU"
  },
  {
    "name": "Achievers University, Owo",
    "value": "achievers university owo",
    "abb": "AUO"
  },
  {
    "name": "Adamawa State Polytechnic, Yola",
    "value": "adamawa state polytechnic yola",
    "abb": "ADAPOLY"
  },
  {
    "name": "Adamawa State University, Mubi",
    "value": "adamawa state university mubi",
    "abb": "ADSU"
  },
  {
    "name": "Adamu Adamu College of Nursing Sciences, Azare",
    "value": "adamu adamu college of nursing sciences azare",
    "abb": "AACNS"
  },
  {
    "name": "Adekunle Ajasin University, Akungba-Akoko",
    "value": "adekunle ajasin university akungba akoko",
    "abb": "AAUA"
  },
  {
    "name": "Adeleke University, Ede",
    "value": "adeleke university ede",
    "abb": "AUE"
  },
  {
    "name": "Adeyemi Federal University of Education, Ondo",
    "value": "adeyemi federal university of education ondo",
    "abb": "AFUED"
  },
  {
    "name": "Afe Babalola University, Ado-Ekiti",
    "value": "afe babalola university ado ekiti",
    "abb": "ABUAD"
  },
  {
    "name": "African University of Science and Technology, Abuja",
    "value": "african university of science and technology abuja",
    "abb": "AUST"
  },
  {
    "name": "Ahmadu Bello University, Zaria",
    "value": "ahmadu bello university zaria",
    "abb": "ABU"
  },
  {
    "name": "Air Force Institute of Technology, Kaduna",
    "value": "air force institute of technology kaduna",
    "abb": "AFIT"
  },
  {
    "name": "Ajayi Crowther University, Oyo",
    "value": "ajayi crowther university oyo",
    "abb": "ACU"
  },
  {
    "name": "Akanu Ibiam Federal Polytechnic, Unwana",
    "value": "akanu ibiam federal polytechnic unwana",
    "abb": "UNWANAPOLY"
  },
  {
    "name": "Akwa Ibom State University, Ikot Akpaden",
    "value": "akwa ibom state university ikot akpaden",
    "abb": "AKSU"
  },
  {
    "name": "Alex Ekwueme Federal University, Ndufu-Alike",
    "value": "alex ekwueme federal university ndufu alike",
    "abb": "AE-FUNAI"
  },
  {
    "name": "Al-Hikmah University, Ilorin",
    "value": "al hikmah university ilorin",
    "abb": "AHU"
  },
  {
    "name": "Aliko Dangote College of Nursing Sciences, Bauchi",
    "value": "aliko dangote college of nursing sciences bauchi",
    "abb": "ADCNS"
  },
  {
    "name": "Al-Qalam University, Katsina",
    "value": "al qalam university katsina",
    "abb": "AUK"
  },
  {
    "name": "Alvan Ikoku Federal University of Education, Owerri",
    "value": "alvan ikoku federal university of education owerri",
    "abb": "ALVAN"
  },
  {
    "name": "Ambrose Alli University, Ekpoma",
    "value": "ambrose alli university ekpoma",
    "abb": "AAU"
  },
  {
    "name": "American University of Nigeria, Yola",
    "value": "american university of nigeria yola",
    "abb": "AUN"
  },
  {
    "name": "Anchor University, Lagos",
    "value": "anchor university lagos",
    "abb": "AUL"
  },
  {
    "name": "Auchi Polytechnic, Auchi",
    "value": "auchi polytechnic auchi",
    "abb": "AUCHIPOLY"
  },
  {
    "name": "Babcock University, Ilishan-Remo",
    "value": "babcock university ilishan remo",
    "abb": "BU"
  },
  {
    "name": "Bayero University, Kano",
    "value": "bayero university kano",
    "abb": "BUK"
  },
  {
    "name": "Baze University, Abuja",
    "value": "baze university abuja",
    "abb": "BAZE"
  },
  {
    "name": "Bells University of Technology, Ota",
    "value": "bells university of technology ota",
    "abb": "BELLSTECH"
  },
  {
    "name": "Benson Idahosa University, Benin City",
    "value": "benson idahosa university benin city",
    "abb": "BIU"
  },
  {
    "name": "Benue State Polytechnic, Ugbokolo",
    "value": "benue state polytechnic ugbokolo",
    "abb": "BENPOLY"
  },
  {
    "name": "Benue State University, Makurdi",
    "value": "benue state university makurdi",
    "abb": "BSUM"
  },
  {
    "name": "Bingham University, Karu",
    "value": "bingham university karu",
    "abb": "ECWA-BU"
  },
  {
    "name": "Bowen University, Iwo",
    "value": "bowen university iwo",
    "abb": "BU"
  },
  {
    "name": "Caleb University, Imota",
    "value": "caleb university imota",
    "abb": "CALEB"
  },
  {
    "name": "Captain Elechi Amadi Polytechnic, Port Harcourt",
    "value": "captain elechi amadi polytechnic port harcourt",
    "abb": "PORTPOLY"
  },
  {
    "name": "Chukwuemeka Odumegwu Ojukwu University, Uli",
    "value": "chukwuemeka odumegwu ojukwu university uli",
    "abb": "COOU"
  },
  {
    "name": "College of Nursing Sciences, ABUTH Zaria",
    "value": "college of nursing sciences abuth zaria",
    "abb": "ABUTH-CNS"
  },
  {
    "name": "College of Nursing Sciences, ATBUTH Bauchi",
    "value": "college of nursing sciences atbuth bauchi",
    "abb": "ATBUTH-CNS"
  },
  {
    "name": "College of Nursing Sciences, Asaba",
    "value": "college of nursing sciences asaba",
    "abb": "CONS-ASABA"
  },
  {
    "name": "College of Nursing Sciences, LUTH Idi-Araba",
    "value": "college of nursing sciences luth idi araba",
    "abb": "LUTH-CNS"
  },
  {
    "name": "College of Nursing Sciences, OAUTHC Ile-Ife",
    "value": "college of nursing sciences oauthc ile ife",
    "abb": "OAUTHC-CNS"
  },
  {
    "name": "College of Nursing Sciences, UCH Ibadan",
    "value": "college of nursing sciences uch ibadan",
    "abb": "UCH-CNS"
  },
  {
    "name": "College of Nursing and Midwifery, Eleyele, Ibadan",
    "value": "college of nursing and midwifery eleyele ibadan",
    "abb": "ELEYELE"
  },
  {
    "name": "Covenant University, Ota",
    "value": "covenant university ota",
    "abb": "CU"
  },
  {
    "name": "Crawford University, Igbesa",
    "value": "crawford university igbesa",
    "abb": "CRU"
  },
  {
    "name": "Crescent University, Abeokuta",
    "value": "crescent university abeokuta",
    "abb": "CUAB"
  },
  {
    "name": "Crown Polytechnic, Ado-Ekiti",
    "value": "crown polytechnic ado ekiti",
    "abb": "CROWNPOLY"
  },
  {
    "name": "D.S. Adegbenro ICT Polytechnic, Itori-Ewekoro",
    "value": "ds adegbenro ict polytechnic itori ewekoro",
    "abb": "DSA-POLY"
  },
  {
    "name": "Delta State Polytechnic, Ogwashi-Uku",
    "value": "delta state polytechnic ogwashi uku",
    "abb": "DSPG"
  },
  {
    "name": "Delta State Polytechnic, Otefe-Oghara",
    "value": "delta state polytechnic otefe oghara",
    "abb": "DESPO"
  },
  {
    "name": "Delta State University, Abraka",
    "value": "delta state university abraka",
    "abb": "DELSU"
  },
  {
    "name": "Dominican University, Ibadan",
    "value": "dominican university ibadan",
    "abb": "DUI"
  },
  {
    "name": "Dorben Polytechnic, Bwari",
    "value": "dorben polytechnic bwari",
    "abb": "DORBENPOLY"
  },
  {
    "name": "ECWA College of Nursing Sciences, Egbe",
    "value": "ecwa college of nursing sciences egbe",
    "abb": "ECWA-EGBE"
  },
  {
    "name": "Ebonyi State University, Abakaliki",
    "value": "ebonyi state university abakaliki",
    "abb": "EBSU"
  },
  {
    "name": "Edo State Polytechnic, Usen",
    "value": "edo state polytechnic usen",
    "abb": "EDOPOLY"
  },
  {
    "name": "Edo State University, Uzairue",
    "value": "edo state university uzairue",
    "abb": "EDSU"
  },
  {
    "name": "Ekiti State University, Ado-Ekiti",
    "value": "ekiti state university ado ekiti",
    "abb": "EKSU"
  },
  {
    "name": "Emmanuel Alayande University of Education, Oyo",
    "value": "emmanuel alayande university of education oyo",
    "abb": "EAUED"
  },
  {
    "name": "Enugu State Polytechnic, Iwollo",
    "value": "enugu state polytechnic iwollo",
    "abb": "ESPOLY"
  },
  {
    "name": "Enugu State University of Science and Technology, Enugu",
    "value": "enugu state university of science and technology enugu",
    "abb": "ESUT"
  },
  {
    "name": "Federal College of Education (Special), Oyo",
    "value": "federal college of education special oyo",
    "abb": "SPED"
  },
  {
    "name": "Federal College of Education (Technical), Akoka",
    "value": "federal college of education technical akoka",
    "abb": "FCET-AKOKA"
  },
  {
    "name": "Federal College of Education, Abeokuta",
    "value": "federal college of education abeokuta",
    "abb": "FCE-ABEOKUTA"
  },
  {
    "name": "Federal College of Education, Kano",
    "value": "federal college of education kano",
    "abb": "FCE-KANO"
  },
  {
    "name": "Federal College of Education, Okene",
    "value": "federal college of education okene",
    "abb": "FCE-OKENE"
  },
  {
    "name": "Federal College of Education, Pankshin",
    "value": "federal college of education pankshin",
    "abb": "FCE-PANKSHIN"
  },
  {
    "name": "Federal College of Education, Zaria",
    "value": "federal college of education zaria",
    "abb": "FCE-ZARIA"
  },
  {
    "name": "Federal Polytechnic, Ado-Ekiti",
    "value": "federal polytechnic ado ekiti",
    "abb": "FEDPOLYADO"
  },
  {
    "name": "Federal Polytechnic, Bauchi",
    "value": "federal polytechnic bauchi",
    "abb": "FPO"
  },
  {
    "name": "Federal Polytechnic, Bida",
    "value": "federal polytechnic bida",
    "abb": "BIDAPOLY"
  },
  {
    "name": "Federal Polytechnic, Damaturu",
    "value": "federal polytechnic damaturu",
    "abb": "FEDPODAM"
  },
  {
    "name": "Federal Polytechnic, Ede",
    "value": "federal polytechnic ede",
    "abb": "EDEPOLY"
  },
  {
    "name": "Federal Polytechnic, Idah",
    "value": "federal polytechnic idah",
    "abb": "FEPODA"
  },
  {
    "name": "Federal Polytechnic, Ilaro",
    "value": "federal polytechnic ilaro",
    "abb": "ILAROPOLY"
  },
  {
    "name": "Federal Polytechnic, Ile-Oluji",
    "value": "federal polytechnic ile oluji",
    "abb": "FEDPOLEL"
  },
  {
    "name": "Federal Polytechnic, Kaura Namoda",
    "value": "federal polytechnic kaura namoda",
    "abb": "FEDPONAM"
  },
  {
    "name": "Federal Polytechnic, Mubi",
    "value": "federal polytechnic mubi",
    "abb": "FPM"
  },
  {
    "name": "Federal Polytechnic, Nasarawa",
    "value": "federal polytechnic nasarawa",
    "abb": "FEDPONAS"
  },
  {
    "name": "Federal Polytechnic, Nekede",
    "value": "federal polytechnic nekede",
    "abb": "NEKEDEPOLY"
  },
  {
    "name": "Federal Polytechnic, Offa",
    "value": "federal polytechnic offa",
    "abb": "OFFAPOLY"
  },
  {
    "name": "Federal Polytechnic, Oko",
    "value": "federal polytechnic oko",
    "abb": "OKOPOLY"
  },
  {
    "name": "Federal University of Agriculture, Abeokuta",
    "value": "federal university of agriculture abeokuta",
    "abb": "FUNAAB"
  },
  {
    "name": "Federal University of Petroleum Resources, Effurun",
    "value": "federal university of petroleum resources effurun",
    "abb": "FUPRE"
  },
  {
    "name": "Federal University of Technology, Akure",
    "value": "federal university of technology akure",
    "abb": "FUTA"
  },
  {
    "name": "Federal University of Technology, Babura",
    "value": "federal university of technology babura",
    "abb": "FUTB"
  },
  {
    "name": "Federal University of Technology, Ikot Abasi",
    "value": "federal university of technology ikot abasi",
    "abb": "FUTIA"
  },
  {
    "name": "Federal University of Technology, Minna",
    "value": "federal university of technology minna",
    "abb": "FUTMinna"
  },
  {
    "name": "Federal University of Technology, Owerri",
    "value": "federal university of technology owerri",
    "abb": "FUTO"
  },
  {
    "name": "Federal University, Birnin Kebbi",
    "value": "federal university birnin kebbi",
    "abb": "FUBK"
  },
  {
    "name": "Federal University, Dutse",
    "value": "federal university dutse",
    "abb": "FUD"
  },
  {
    "name": "Federal University, Dutsin-Ma",
    "value": "federal university dutsin ma",
    "abb": "FUDMA"
  },
  {
    "name": "Federal University, Gashua",
    "value": "federal university gashua",
    "abb": "FUGA"
  },
  {
    "name": "Federal University, Gusau",
    "value": "federal university gusau",
    "abb": "FUGUS"
  },
  {
    "name": "Federal University, Kashere",
    "value": "federal university kashere",
    "abb": "FUK"
  },
  {
    "name": "Federal University, Lafia",
    "value": "federal university lafia",
    "abb": "FULAFIA"
  },
  {
    "name": "Federal University, Lokoja",
    "value": "federal university lokoja",
    "abb": "FULOKOJA"
  },
  {
    "name": "Federal University, Oye-Ekiti",
    "value": "federal university oye ekiti",
    "abb": "FUOYE"
  },
  {
    "name": "Federal University, Wukari",
    "value": "federal university wukari",
    "abb": "FUWUKARI"
  },
  {
    "name": "Fidei Polytechnic, Gboko",
    "value": "fidei polytechnic gboko",
    "abb": "FIDEIPOLY"
  },
  {
    "name": "Fountain University, Osogbo",
    "value": "fountain university osogbo",
    "abb": "FUO"
  },
  {
    "name": "Gateway Polytechnic, Saapade",
    "value": "gateway polytechnic saapade",
    "abb": "GAPOSA"
  },
  {
    "name": "Godfrey Okoye University, Enugu",
    "value": "godfrey okoye university enugu",
    "abb": "GOUNI"
  },
  {
    "name": "Gombe State Polytechnic, Bajoga",
    "value": "gombe state polytechnic bajoga",
    "abb": "GSPB"
  },
  {
    "name": "Gombe State University, Gombe",
    "value": "gombe state university gombe",
    "abb": "GSU"
  },
  {
    "name": "Grace Polytechnic, Surulere",
    "value": "grace polytechnic surulere",
    "abb": "GRACEPOLY"
  },
  {
    "name": "Gracelane Polytechnic, Offa",
    "value": "gracelane polytechnic offa",
    "abb": "GRACELANE"
  },
  {
    "name": "Hassan Usman Katsina Polytechnic, Katsina",
    "value": "hassan usman katsina polytechnic katsina",
    "abb": "HUKPOLY"
  },
  {
    "name": "Ibrahim Badamasi Babangida University, Lapai",
    "value": "ibrahim badamasi babangida university lapai",
    "abb": "IBBU"
  },
  {
    "name": "Igbinedion University, Okada",
    "value": "igbinedion university okada",
    "abb": "IUO"
  },
  {
    "name": "Ignatius Ajuru University of Education, Port Harcourt",
    "value": "ignatius ajuru university of education port harcourt",
    "abb": "IAUE"
  },
  {
    "name": "Imo State Polytechnic, Omuma",
    "value": "imo state polytechnic omuma",
    "abb": "IMOPOLY"
  },
  {
    "name": "Imo State University, Owerri",
    "value": "imo state university owerri",
    "abb": "IMSU"
  },
  {
    "name": "Institute of Management and Technology, Enugu",
    "value": "institute of management and technology enugu",
    "abb": "IMT"
  },
  {
    "name": "Isa Mustapha Agwai I Polytechnic, Lafia",
    "value": "isa mustapha agwai i polytechnic lafia",
    "abb": "IMAP"
  },
  {
    "name": "Jigawa State Polytechnic, Dutse",
    "value": "jigawa state polytechnic dutse",
    "abb": "JIGPOLY"
  },
  {
    "name": "Joseph Ayo Babalola University, Ikeji-Arakeji",
    "value": "joseph ayo babalola university ikeji arakeji",
    "abb": "JABU"
  },
  {
    "name": "Joseph Sarwuan Tarka University, Makurdi",
    "value": "joseph sarwuan tarka university makurdi",
    "abb": "JOSTUM"
  },
  {
    "name": "Kaduna Polytechnic, Kaduna",
    "value": "kaduna polytechnic kaduna",
    "abb": "KADPOLY"
  },
  {
    "name": "Kaduna State University, Kaduna",
    "value": "kaduna state university kaduna",
    "abb": "KASU"
  },
  {
    "name": "Kano State Polytechnic, Kano",
    "value": "kano state polytechnic kano",
    "abb": "KANOPOLY"
  },
  {
    "name": "Kano University of Science and Technology, Wudil",
    "value": "kano university of science and technology wudil",
    "abb": "KUST"
  },
  {
    "name": "Kebbi State Polytechnic, Dakingari",
    "value": "kebbi state polytechnic dakingari",
    "abb": "KESPO"
  },
  {
    "name": "Kebbi State University of Science and Technology, Aliero",
    "value": "kebbi state university of science and technology aliero",
    "abb": "KSUSTA"
  },
  {
    "name": "Kenule Beeson Saro-Wiwa Polytechnic, Bori",
    "value": "kenule beeson saro wiwa polytechnic bori",
    "abb": "KENPOLY"
  },
  {
    "name": "Kogi State Polytechnic, Lokoja",
    "value": "kogi state polytechnic lokoja",
    "abb": "KOGIPOLY"
  },
  {
    "name": "Kwara State College of Education, Ilorin",
    "value": "kwara state college of education ilorin",
    "abb": "KWCOE"
  },
  {
    "name": "Kwara State College of Health Technology, Offa",
    "value": "kwara state college of health technology offa",
    "abb": "OFFAHEALTH"
  },
  {
    "name": "Kwara State College of Nursing Sciences, Ilorin",
    "value": "kwara state college of nursing sciences ilorin",
    "abb": "KWCON"
  },
  {
    "name": "Kwara State College of Nursing Sciences, Oke-Ode",
    "value": "kwara state college of nursing sciences oke ode",
    "abb": "KWCON-OKEODE"
  },
  {
    "name": "Kwara State Polytechnic, Ilorin",
    "value": "kwara state polytechnic ilorin",
    "abb": "KWARAPOLY"
  },
  {
    "name": "Kwara State University, Malete",
    "value": "kwara state university malete",
    "abb": "KWASU"
  },
  {
    "name": "Kwararafa University, Wukari",
    "value": "kwararafa university wukari",
    "abb": "KUW"
  },
  {
    "name": "Ladoke Akintola University of Technology, Ogbomoso",
    "value": "ladoke akintola university of technology ogbomoso",
    "abb": "LAUTECH"
  },
  {
    "name": "Lagos City Polytechnic, Ikeja",
    "value": "lagos city polytechnic ikeja",
    "abb": "LCP"
  },
  {
    "name": "Lagos State University of Education, Ijanikin",
    "value": "lagos state university of education ijanikin",
    "abb": "LASUED"
  },
  {
    "name": "Lagos State University of Science and Technology, Ikorodu",
    "value": "lagos state university of science and technology ikorodu",
    "abb": "LASUSTECH"
  },
  {
    "name": "Lagos State University, Ojo",
    "value": "lagos state university ojo",
    "abb": "LASU"
  },
  {
    "name": "Landmark Polytechnic, Ayetoro",
    "value": "landmark polytechnic ayetoro",
    "abb": "LANDMARKPOLY"
  },
  {
    "name": "Landmark University, Omu-Aran",
    "value": "landmark university omu aran",
    "abb": "LMU"
  },
  {
    "name": "Lead City University, Ibadan",
    "value": "lead city university ibadan",
    "abb": "LCU"
  },
  {
    "name": "Lens Polytechnic, Offa",
    "value": "lens polytechnic offa",
    "abb": "LENSPOLY"
  },
  {
    "name": "Madonna University, Elele",
    "value": "madonna university elele",
    "abb": "MUA"
  },
  {
    "name": "Maritime Academy of Nigeria, Oron",
    "value": "maritime academy of nigeria oron",
    "abb": "MAN-ORON"
  },
  {
    "name": "Moshood Abiola Polytechnic, Abeokuta",
    "value": "moshood abiola polytechnic abeokuta",
    "abb": "MAPOLY"
  },
  {
    "name": "Mountain Top University, Makogi Aba",
    "value": "mountain top university makogi aba",
    "abb": "MTU"
  },
  {
    "name": "Nasarawa State University, Keffi",
    "value": "nasarawa state university keffi",
    "abb": "NSUK"
  },
  {
    "name": "Niger Delta University, Wilberforce Island",
    "value": "niger delta university wilberforce island",
    "abb": "NDU"
  },
  {
    "name": "Niger State College of Education, Minna",
    "value": "niger state college of education minna",
    "abb": "COEMINNA"
  },
  {
    "name": "Niger State Polytechnic, Zungeru",
    "value": "niger state polytechnic zungeru",
    "abb": "NIGERPOLY"
  },
  {
    "name": "Nile University of Nigeria, Abuja",
    "value": "nile university of nigeria abuja",
    "abb": "NUN"
  },
  {
    "name": "Nnamdi Azikiwe University, Awka",
    "value": "nnamdi azikiwe university awka",
    "abb": "UNIZIK"
  },
  {
    "name": "Nuhu Bamalli Polytechnic, Zaria",
    "value": "nuhu bamalli polytechnic zaria",
    "abb": "NUBAPOLY"
  },
  {
    "name": "Obafemi Awolowo University, Ile-Ife",
    "value": "obafemi awolowo university ile ife",
    "abb": "OAU"
  },
  {
    "name": "Ogun State Institute of Technology, Igbesa",
    "value": "ogun state institute of technology igbesa",
    "abb": "OGITECH"
  },
  {
    "name": "Olabisi Onabanjo University, Ago-Iwoye",
    "value": "olabisi onabanjo university ago iwoye",
    "abb": "OOU"
  },
  {
    "name": "Osun State College of Technology, Esa-Oke",
    "value": "osun state college of technology esa oke",
    "abb": "OSCOTECH"
  },
  {
    "name": "Osun State Polytechnic, Iree",
    "value": "osun state polytechnic iree",
    "abb": "OSPOLY"
  },
  {
    "name": "Osun State University, Osogbo",
    "value": "osun state university osogbo",
    "abb": "UNIOSUN"
  },
  {
    "name": "Oyo State College of Agriculture and Technology, Igboora",
    "value": "oyo state college of agriculture and technology igboora",
    "abb": "OYSCATECH"
  },
  {
    "name": "Pan-Atlantic University, Lekki",
    "value": "pan atlantic university lekki",
    "abb": "PAU"
  },
  {
    "name": "Plateau State Polytechnic, Barkin-Ladi",
    "value": "plateau state polytechnic barkin ladi",
    "abb": "PLAPOLY"
  },
  {
    "name": "Plateau State University, Bokkos",
    "value": "plateau state university bokkos",
    "abb": "PLASU"
  },
  {
    "name": "Prince Abubakar Audu University, Anyigba",
    "value": "prince abubakar audu university anyigba",
    "abb": "PAAU"
  },
  {
    "name": "Ramat Polytechnic, Maiduguri",
    "value": "ramat polytechnic maiduguri",
    "abb": "RAMATPOLY"
  },
  {
    "name": "Redeemer's University, Ede",
    "value": "redeemers university ede",
    "abb": "RUN"
  },
  {
    "name": "Rivers State University, Port Harcourt",
    "value": "rivers state university port harcourt",
    "abb": "RSU"
  },
  {
    "name": "Rufus Giwa Polytechnic, Owo",
    "value": "rufus giwa polytechnic owo",
    "abb": "RUGIPO"
  },
  {
    "name": "Sa'ad Zungur College of Nursing Sciences, Bauchi",
    "value": "sa ad zungur college of nursing sciences bauchi",
    "abb": "SZCONS"
  },
  {
    "name": "Shehu Shagari University of Education, Sokoto",
    "value": "shehu shagari university of education sokoto",
    "abb": "SSUED"
  },
  {
    "name": "Sokoto State University, Sokoto",
    "value": "sokoto state university sokoto",
    "abb": "SSU"
  },
  {
    "name": "Standard College of Nursing Sciences, Minna",
    "value": "standard college of nursing sciences minna",
    "abb": "SCONS"
  },
  {
    "name": "Summit University, Offa",
    "value": "summit university offa",
    "abb": "SUN"
  },
  {
    "name": "Tai Solarin University of Education, Ijagun",
    "value": "tai solarin university of education ijagun",
    "abb": "TASUED"
  },
  {
    "name": "Taraba State Polytechnic, Suntai",
    "value": "taraba state polytechnic suntai",
    "abb": "TARABAPOLY"
  },
  {
    "name": "Taraba State University, Jalingo",
    "value": "taraba state university jalingo",
    "abb": "TSU"
  },
  {
    "name": "The Oke-Ogun Polytechnic, Saki",
    "value": "the oke ogun polytechnic saki",
    "abb": "TOPS"
  },
  {
    "name": "The Polytechnic, Ibadan",
    "value": "the polytechnic ibadan",
    "abb": "POLYIBADAN"
  },
  {
    "name": "Thomas Adewumi University, Oko",
    "value": "thomas adewumi university oko",
    "abb": "TAU"
  },
  {
    "name": "Umaru Musa Yar'Adua University, Katsina",
    "value": "umaru musa yaradua university katsina",
    "abb": "UMYU"
  },
  {
    "name": "University of Abuja, Gwagwalada",
    "value": "university of abuja gwagwalada",
    "abb": "UNIABUJA"
  },
  {
    "name": "University of Benin, Benin City",
    "value": "university of benin benin city",
    "abb": "UNIBEN"
  },
  {
    "name": "University of Calabar, Calabar",
    "value": "university of calabar calabar",
    "abb": "UNICAL"
  },
  {
    "name": "University of Ibadan, Ibadan",
    "value": "university of ibadan ibadan",
    "abb": "UI"
  },
  {
    "name": "University of Ilorin, Ilorin",
    "value": "university of ilorin ilorin",
    "abb": "UNILORIN"
  },
  {
    "name": "University of Jos, Jos",
    "value": "university of jos jos",
    "abb": "UNIJOS"
  },
  {
    "name": "University of Lagos, Akoka",
    "value": "university of lagos akoka",
    "abb": "UNILAG"
  },
  {
    "name": "University of Maiduguri, Maiduguri",
    "value": "university of maiduguri maiduguri",
    "abb": "UNIMAID"
  },
  {
    "name": "University of Medical Sciences, Ondo",
    "value": "university of medical sciences ondo",
    "abb": "UNIMED"
  },
  {
    "name": "University of Nigeria, Nsukka",
    "value": "university of nigeria nsukka",
    "abb": "UNN"
  },
  {
    "name": "University of Port Harcourt, Port Harcourt",
    "value": "university of port harcourt port harcourt",
    "abb": "UNIPORT"
  },
  {
    "name": "University of Uyo, Uyo",
    "value": "university of uyo uyo",
    "abb": "UNIUYO"
  },
  {
    "name": "Veritas University, Abuja",
    "value": "veritas university abuja",
    "abb": "VERITAS"
  },
  {
    "name": "Waziri Umaru Federal Polytechnic, Birnin Kebbi",
    "value": "waziri umaru federal polytechnic birnin kebbi",
    "abb": "WUFPBK"
  },
  {
    "name": "Yaba College of Technology, Yaba",
    "value": "yaba college of technology yaba",
    "abb": "YABATECH"
  },
  {
    "name": "Yobe State University, Damaturu",
    "value": "yobe state university damaturu",
    "abb": "YSU"
  }
]

export default institutions;