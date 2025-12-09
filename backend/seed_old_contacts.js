// seed_old_contacts.js
const mongoose = require("mongoose");
const Contact = require("./Contact");

// 1) Connect to SAME DB as server.js
mongoose
  .connect("mongodb://127.0.0.1:27017/contacts_db")
  .then(() => {
    console.log("✅ MongoDB connected for seeding old contacts");
    return seedOldContacts();
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });

async function seedOldContacts() {
  try {
    // 2) Your OLD contacts array (PASTE ONLY ARRAY HERE)
    const oldContacts = [
        {"title":"Mr","firstName":"John","lastName":"Doe","mobile1":"9876543210","mobile2":"9123456789","address":{"city":"Hyderabad","state":"Telangana","pincode":"500001"}},
  {"title":"Mrs","firstName":"Priya","lastName":"Rao","mobile1":"9988776655","mobile2":"9911223344","address":{"city":"Chennai","state":"Tamil Nadu","pincode":"600001"}},
  {"title":"Mr","firstName":"Arjun","lastName":"Patel","mobile1":"9090909090","mobile2":"8888888888","address":{"city":"Mumbai","state":"Maharashtra","pincode":"400001"}},
  {"title":"Ms","firstName":"Sneha","lastName":"Kumar","mobile1":"9898989898","mobile2":"9777777777","address":{"city":"Bangalore","state":"Karnataka","pincode":"560001"}},
  {"title":"Dr","firstName":"Ravi","lastName":"Verma","mobile1":"9654321987","mobile2":"9543218765","address":{"city":"Hyderabad","state":"Telangana","pincode":"500002"}},
  {"title":"Mr","firstName":"John","lastName":"Doe","mobile1":"9876543210","mobile2":"9123456789","address":{"city":"Hyderabad","state":"Telangana","pincode":"500001"}},
  {"title":"Ms","firstName":"Priya","lastName":"Sharma","mobile1":"9812345678","mobile2":"9988776655","address":{"city":"Delhi","state":"Delhi","pincode":"110001"}},
  {"title":"Dr","firstName":"Rahul","lastName":"Verma","mobile1":"9797979797","mobile2":"9898989898","address":{"city":"Pune","state":"Maharashtra","pincode":"411001"}},
  {"title":"Mrs","firstName":"Anita","lastName":"Nair","mobile1":"8888888888","mobile2":"9999999999","address":{"city":"Bangalore","state":"Karnataka","pincode":"560001"}},
  {"title":"Mr","firstName":"Suresh","lastName":"Patel","mobile1":"9123412341","mobile2":"9786597865","address":{"city":"Ahmedabad","state":"Gujarat","pincode":"380001"}},
  {"title":"Ms","firstName":"Sneha","lastName":"Reddy","mobile1":"9000000001","mobile2":"9111111111","address":{"city":"Chennai","state":"Tamil Nadu","pincode":"600001"}},
  {"title":"Mr","firstName":"Arjun","lastName":"Mehta","mobile1":"9900990099","mobile2":"9819819819","address":{"city":"Chandigarh","state":"Chandigarh","pincode":"160017"}},
  {"title":"Mrs","firstName":"Neha","lastName":"Kaur","mobile1":"8877665544","mobile2":"7766554433","address":{"city":"Amritsar","state":"Punjab","pincode":"143001"}},
  {"title":"Mr","firstName":"Ravi","lastName":"Das","mobile1":"9898123456","mobile2":"9822765432","address":{"city":"Kolkata","state":"West Bengal","pincode":"700001"}},
  {"title":"Ms","firstName":"Fatima","lastName":"Ali","mobile1":"9798456123","mobile2":"9876598765","address":{"city":"Lucknow","state":"Uttar Pradesh","pincode":"226001"}},
  {"title":"Mr","firstName":"Vikram","lastName":"Singh","mobile1":"9876501234","mobile2":"9123498765","address":{"city":"Jaipur","state":"Rajasthan","pincode":"302001"}},
  {"title":"Mrs","firstName":"Kavita","lastName":"Iyer","mobile1":"9823123456","mobile2":"9912345678","address":{"city":"Coimbatore","state":"Tamil Nadu","pincode":"641001"}},
  {"title":"Mr","firstName":"Rajesh","lastName":"Pillai","mobile1":"9867543210","mobile2":"9934567890","address":{"city":"Thiruvananthapuram","state":"Kerala","pincode":"695001"}},
  {"title":"Ms","firstName":"Anjali","lastName":"Das","mobile1":"9811198765","mobile2":"9023456789","address":{"city":"Bhubaneswar","state":"Odisha","pincode":"751001"}},
  {"title":"Dr","firstName":"Karan","lastName":"Bhatia","mobile1":"9700001111","mobile2":"9600002222","address":{"city":"Surat","state":"Gujarat","pincode":"395001"}},
  {"title":"Mr","firstName":"Deepak","lastName":"Ghosh","mobile1":"9933004455","mobile2":"9888899999","address":{"city":"Kolkata","state":"West Bengal","pincode":"700019"}},
  {"title":"Mrs","firstName":"Pooja","lastName":"Menon","mobile1":"9123450000","mobile2":"9345671234","address":{"city":"Kochi","state":"Kerala","pincode":"682001"}},
  {"title":"Mr","firstName":"Sameer","lastName":"Khan","mobile1":"9988776655","mobile2":"9876543211","address":{"city":"Bhopal","state":"Madhya Pradesh","pincode":"462001"}},
  {"title":"Ms","firstName":"Nisha","lastName":"Rao","mobile1":"9456123456","mobile2":"9871236540","address":{"city":"Vijayawada","state":"Andhra Pradesh","pincode":"520001"}},
  {"title":"Mr","firstName":"Akash","lastName":"Jain","mobile1":"9123412345","mobile2":"9234567890","address":{"city":"Indore","state":"Madhya Pradesh","pincode":"452001"}},
  {"title":"Mrs","firstName":"Divya","lastName":"Patil","mobile1":"9345678912","mobile2":"9456123789","address":{"city":"Nagpur","state":"Maharashtra","pincode":"440001"}},
  {"title":"Mr","firstName":"Harish","lastName":"Mishra","mobile1":"9789001122","mobile2":"9911223344","address":{"city":"Varanasi","state":"Uttar Pradesh","pincode":"221001"}},
  {"title":"Dr","firstName":"Mohan","lastName":"Chatterjee","mobile1":"9933221100","mobile2":"9845098765","address":{"city":"Durgapur","state":"West Bengal","pincode":"713201"}},
  {"title":"Ms","firstName":"Ritika","lastName":"Joshi","mobile1":"9900991122","mobile2":"9811112233","address":{"city":"Pune","state":"Maharashtra","pincode":"411002"}},
  {"title":"Mr","firstName":"Sanjay","lastName":"Yadav","mobile1":"9123098765","mobile2":"9876501234","address":{"city":"Kanpur","state":"Uttar Pradesh","pincode":"208001"}},
  {"title":"Mrs","firstName":"Shreya","lastName":"Deshmukh","mobile1":"9012345678","mobile2":"9988776655","address":{"city":"Nashik","state":"Maharashtra","pincode":"422001"}},
  {"title":"Mr","firstName":"Lokesh","lastName":"Rana","mobile1":"9998887776","mobile2":"9887766554","address":{"city":"Dehradun","state":"Uttarakhand","pincode":"248001"}},
  {"title":"Ms","firstName":"Preeti","lastName":"Chopra","mobile1":"9812312312","mobile2":"9823423423","address":{"city":"Gurgaon","state":"Haryana","pincode":"122001"}},
  {"title":"Mr","firstName":"Gautam","lastName":"Sen","mobile1":"9123009876","mobile2":"9345609871","address":{"city":"Howrah","state":"West Bengal","pincode":"711101"}},
  {"title":"Mrs","firstName":"Manisha","lastName":"Dasgupta","mobile1":"9112233445","mobile2":"9223344556","address":{"city":"Siliguri","state":"West Bengal","pincode":"734001"}},
  {"title":"Mr","firstName":"Rohit","lastName":"Kumar","mobile1":"9011223344","mobile2":"9112233445","address":{"city":"Patna","state":"Bihar","pincode":"800001"}},
  {"title":"Ms","firstName":"Simran","lastName":"Kapoor","mobile1":"9123456789","mobile2":"9345612345","address":{"city":"Delhi","state":"Delhi","pincode":"110002"}},
  {"title":"Mr","firstName":"Yogesh","lastName":"Pandey","mobile1":"9786098765","mobile2":"9678001234","address":{"city":"Raipur","state":"Chhattisgarh","pincode":"492001"}},
  {"title":"Dr","firstName":"Bhavna","lastName":"Saxena","mobile1":"9654321876","mobile2":"9765432198","address":{"city":"Gwalior","state":"Madhya Pradesh","pincode":"474001"}},
  {"title":"Mr","firstName":"Suraj","lastName":"Bisht","mobile1":"9912345678","mobile2":"9811223344","address":{"city":"Noida","state":"Uttar Pradesh","pincode":"201301"}},
  {"title":"Mrs","firstName":"Tina","lastName":"George","mobile1":"9001234567","mobile2":"9119876543","address":{"city":"Kochi","state":"Kerala","pincode":"682020"}},
  {"title":"Ms","firstName":"Aishwarya","lastName":"Nambiar","mobile1":"9876541230","mobile2":"9123409876","address":{"city":"Mangalore","state":"Karnataka","pincode":"575001"}},
  {"title":"Mr","firstName":"Ramesh","lastName":"Babu","mobile1":"9345612345","mobile2":"9456723456","address":{"city":"Vijayawada","state":"Andhra Pradesh","pincode":"520002"}},
  {"title":"Mr","firstName":"Amit","lastName":"Sharma","mobile1":"9012345000","mobile2":"9823456000","address":{"city":"Delhi","state":"Delhi","pincode":"110003"}},
  {"title":"Dr","firstName":"Vivek","lastName":"Rao","mobile1":"9786001234","mobile2":"9678012345","address":{"city":"Chennai","state":"Tamil Nadu","pincode":"600002"}},
  {"title":"Mr","firstName":"Prashant","lastName":"Thakur","mobile1":"9456123098","mobile2":"9876503214","address":{"city":"Ranchi","state":"Jharkhand","pincode":"834001"}},
  {"title":"Mrs","firstName":"Lata","lastName":"Desai","mobile1":"9123411111","mobile2":"9345622222","address":{"city":"Surat","state":"Gujarat","pincode":"395002"}},
  {"title":"Ms","firstName":"Meena","lastName":"Bhatt","mobile1":"9786543210","mobile2":"9678901234","address":{"city":"Shimla","state":"Himachal Pradesh","pincode":"171001"}},
  {"title":"Mr","firstName":"Ajay","lastName":"Tripathi","mobile1":"9823412345","mobile2":"9945612345","address":{"city":"Allahabad","state":"Uttar Pradesh","pincode":"211001"}},
  {"title":"Ms","firstName":"Nivedita","lastName":"Joshi","mobile1":"9123098765","mobile2":"9012233445","address":{"city":"Nagpur","state":"Maharashtra","pincode":"440002"}},
  {"title":"Mr","firstName":"Deep","lastName":"Malhotra","mobile1":"9887766554","mobile2":"9776655443","address":{"city":"Chandigarh","state":"Chandigarh","pincode":"160018"}},
  {"title":"Mrs","firstName":"Rekha","lastName":"Sinha","mobile1":"9345611122","mobile2":"9012312345","address":{"city":"Patna","state":"Bihar","pincode":"800002"}},
  {"title":"Mr","firstName":"Arjun","lastName":"Verma","mobile1":"9876102345","mobile2":"9967123456","address":{"city":"Hyderabad","state":"Telangana","pincode":"500001"}},
  {"title":"Ms","firstName":"Priya","lastName":"Iyer","mobile1":"9812345609","mobile2":"9823456710","address":{"city":"Chennai","state":"Tamil Nadu","pincode":"600001"}},
  {"title":"Mr","firstName":"Ravi","lastName":"Menon","mobile1":"9923456781","mobile2":"9934567892","address":{"city":"Bangalore","state":"Karnataka","pincode":"560001"}},
  {"title":"Mrs","firstName":"Sneha","lastName":"Patel","mobile1":"9845012345","mobile2":"9856012346","address":{"city":"Ahmedabad","state":"Gujarat","pincode":"380001"}},
  {"title":"Mr","firstName":"Vikram","lastName":"Sharma","mobile1":"9867098765","mobile2":"9878098765","address":{"city":"Mumbai","state":"Maharashtra","pincode":"400001"}},
  {"title":"Ms","firstName":"Anita","lastName":"Reddy","mobile1":"9778899001","mobile2":"9889900112","address":{"city":"Vijayawada","state":"Andhra Pradesh","pincode":"520001"}},
  {"title":"Mr","firstName":"Manoj","lastName":"Kumar","mobile1":"9090101010","mobile2":"9191212121","address":{"city":"Delhi","state":"Delhi","pincode":"110001"}},
  {"title":"Dr","firstName":"Sanjay","lastName":"Ghosh","mobile1":"9301234567","mobile2":"9402345678","address":{"city":"Kolkata","state":"West Bengal","pincode":"700001"}},
  {"title":"Mr","firstName":"Karthik","lastName":"Joshi","mobile1":"9509876543","mobile2":"9610987654","address":{"city":"Pune","state":"Maharashtra","pincode":"411001"}},
  {"title":"Ms","firstName":"Divya","lastName":"Nair","mobile1":"9811223344","mobile2":"9822334455","address":{"city":"Kochi","state":"Kerala","pincode":"682001"}},
  {"title":"Mr","firstName":"Harish","lastName":"Yadav","mobile1":"9923001100","mobile2":"9934112211","address":{"city":"Lucknow","state":"Uttar Pradesh","pincode":"226001"}},
  {"title":"Mrs","firstName":"Lakshmi","lastName":"Pillai","mobile1":"9844455566","mobile2":"9855566677","address":{"city":"Thiruvananthapuram","state":"Kerala","pincode":"695001"}},
  {"title":"Mr","firstName":"Suresh","lastName":"Bhatia","mobile1":"9777111222","mobile2":"9888222333","address":{"city":"Jaipur","state":"Rajasthan","pincode":"302001"}},
  {"title":"Ms","firstName":"Ritu","lastName":"Chauhan","mobile1":"9009988776","mobile2":"9110099887","address":{"city":"Bhopal","state":"Madhya Pradesh","pincode":"462001"}},
  {"title":"Mr","firstName":"Ajay","lastName":"Das","mobile1":"9123098765","mobile2":"9234098765","address":{"city":"Bhubaneswar","state":"Odisha","pincode":"751001"}},
  {"title":"Mrs","firstName":"Neeta","lastName":"Kapoor","mobile1":"9345123456","mobile2":"9456123456","address":{"city":"Chandigarh","state":"Chandigarh","pincode":"160017"}},
  {"title":"Mr","firstName":"Pankaj","lastName":"Rana","mobile1":"9876012345","mobile2":"9887012346","address":{"city":"Shimla","state":"Himachal Pradesh","pincode":"171001"}},
  {"title":"Ms","firstName":"Kavya","lastName":"Bansal","mobile1":"9765432100","mobile2":"9876543210","address":{"city":"Gurgaon","state":"Haryana","pincode":"122001"}},
  {"title":"Mr","firstName":"Arvind","lastName":"Chatterjee","mobile1":"9900112233","mobile2":"9911223344","address":{"city":"Howrah","state":"West Bengal","pincode":"711101"}},
  {"title":"Mrs","firstName":"Deepa","lastName":"Nanda","mobile1":"9334455566","mobile2":"9445566677","address":{"city":"Ranchi","state":"Jharkhand","pincode":"834001"}},
  {"title":"Mr","firstName":"Vinay","lastName":"Patil","mobile1":"9556677889","mobile2":"9667788990","address":{"city":"Kolhapur","state":"Maharashtra","pincode":"416001"}},
  {"title":"Ms","firstName":"Pooja","lastName":"Mehra","mobile1":"9812347777","mobile2":"9823458888","address":{"city":"Noida","state":"Uttar Pradesh","pincode":"201301"}},
  {"title":"Mr","firstName":"Nikhil","lastName":"Tiwari","mobile1":"9789012345","mobile2":"9890123456","address":{"city":"Varanasi","state":"Uttar Pradesh","pincode":"221001"}},
  {"title":"Mrs","firstName":"Asha","lastName":"Rao","mobile1":"9123459876","mobile2":"9234560987","address":{"city":"Visakhapatnam","state":"Andhra Pradesh","pincode":"530001"}},
  {"title":"Mr","firstName":"Sahil","lastName":"Gandhi","mobile1":"9001002003","mobile2":"9112003004","address":{"city":"Surat","state":"Gujarat","pincode":"395003"}},
  {"title":"Ms","firstName":"Monika","lastName":"Singh","mobile1":"9345012345","mobile2":"9456012345","address":{"city":"Agra","state":"Uttar Pradesh","pincode":"282001"}},
  {"title":"Mr","firstName":"Rahul","lastName":"Prajapati","mobile1":"9723344556","mobile2":"9834455667","address":{"city":"Indore","state":"Madhya Pradesh","pincode":"452001"}},
  {"title":"Ms","firstName":"Tanya","lastName":"Rana","mobile1":"9345678901","mobile2":"9456789012","address":{"city":"Dehradun","state":"Uttarakhand","pincode":"248001"}},
  {"title":"Mr","firstName":"Rajesh","lastName":"Nair","mobile1":"9123987654","mobile2":"9234098765","address":{"city":"Ernakulam","state":"Kerala","pincode":"682016"}},
  {"title":"Mrs","firstName":"Savita","lastName":"Joshi","mobile1":"9988123456","mobile2":"9999234567","address":{"city":"Coimbatore","state":"Tamil Nadu","pincode":"641001"}},
  {"title":"Mr","firstName":"Ashok","lastName":"Reddy","mobile1":"9098997979","mobile2":"9198989898","address":{"city":"Warangal","state":"Telangana","pincode":"506002"}},
  {"title":"Ms","firstName":"Nisha","lastName":"Dev","mobile1":"9876543211","mobile2":"9987654322","address":{"city":"Madurai","state":"Tamil Nadu","pincode":"625001"}},
  {"title":"Mr","firstName":"Gaurav","lastName":"Thakur","mobile1":"9345098765","mobile2":"9456198765","address":{"city":"Raipur","state":"Chhattisgarh","pincode":"492001"}},
  {"title":"Ms","firstName":"Rekha","lastName":"Mishra","mobile1":"9556677880","mobile2":"9667788990","address":{"city":"Patna","state":"Bihar","pincode":"800001"}},
  {"title":"Mr","firstName":"Krishna","lastName":"Pandey","mobile1":"9812312312","mobile2":"9823423423","address":{"city":"Kanpur","state":"Uttar Pradesh","pincode":"208001"}},
  {"title":"Mrs","firstName":"Lalitha","lastName":"Menon","mobile1":"9945678901","mobile2":"9956789012","address":{"city":"Thrissur","state":"Kerala","pincode":"680001"}},
  {"title":"Mr","firstName":"Vivek","lastName":"Shetty","mobile1":"9812345670","mobile2":"9923456780","address":{"city":"Mangalore","state":"Karnataka","pincode":"575001"}},
  {"title":"Ms","firstName":"Riya","lastName":"Das","mobile1":"9876512345","mobile2":"9987623456","address":{"city":"Guwahati","state":"Assam","pincode":"781001"}},
  {"title":"Mr","firstName":"Harsha","lastName":"Patel","mobile1":"9345671234","mobile2":"9456782345","address":{"city":"Vadodara","state":"Gujarat","pincode":"390001"}},
  {"title":"Ms","firstName":"Bhavana","lastName":"Kumar","mobile1":"9765432198","mobile2":"9876543298","address":{"city":"Tirupati","state":"Andhra Pradesh","pincode":"517501"}},
  {"title":"Mr","firstName":"Anand","lastName":"Bora","mobile1":"9908776655","mobile2":"9919887766","address":{"city":"Tezpur","state":"Assam","pincode":"784001"}},
  {"title":"Mrs","firstName":"Meena","lastName":"Gowda","mobile1":"9887001234","mobile2":"9898002345","address":{"city":"Mysore","state":"Karnataka","pincode":"570001"}},
  {"title":"Mr","firstName":"Kiran","lastName":"Naidu","mobile1":"9123099999","mobile2":"9234099999","address":{"city":"Tirunelveli","state":"Tamil Nadu","pincode":"627001"}},
  {"title":"Ms","firstName":"Preeti","lastName":"Sen","mobile1":"9312312312","mobile2":"9423423423","address":{"city":"Durgapur","state":"West Bengal","pincode":"713201"}},
  {"title":"Mr","firstName":"Abhishek","lastName":"Bhat","mobile1":"9512312312","mobile2":"9623423423","address":{"city":"Hubli","state":"Karnataka","pincode":"580020"}},
  {"title":"Mrs","firstName":"Komal","lastName":"Rana","mobile1":"9412312312","mobile2":"9523423423","address":{"city":"Manali","state":"Himachal Pradesh","pincode":"175131"}},
  {"title":"Mr","firstName":"Rohit","lastName":"Gill","mobile1":"9612312312","mobile2":"9723423423","address":{"city":"Ludhiana","state":"Punjab","pincode":"141001"}},
  {"title":"Ms","firstName":"Tanvi","lastName":"Basu","mobile1":"9811112233","mobile2":"9922223344","address":{"city":"Siliguri","state":"West Bengal","pincode":"734001"}},
  {"title":"Mr","firstName":"Jatin","lastName":"Roy","mobile1":"9022334455","mobile2":"9133445566","address":{"city":"Cuttack","state":"Odisha","pincode":"753001"}},
  {"title":"Mrs","firstName":"Anjali","lastName":"Desai","mobile1":"9944556677","mobile2":"9955667788","address":{"city":"Nashik","state":"Maharashtra","pincode":"422001"}},
  {"title":"Mr","firstName":"K.","lastName":"Manoj","mobile1":"7095490041","mobile2":"2374893748","address":{"city":"Chittoor","state":"Andhra Pradesh","pincode":"517422"}},
  {"title":"Mr","firstName":"bala","lastName":"v","mobile1":"6783466678","mobile2":"3745897358","address":{"city":"Chittoor","state":"Andhra Pradesh","pincode":"517422"}},
  {"title":"Mr","firstName":"sam","lastName":"cs","mobile1":"8777678556","mobile2":"6676564453","address":{"city":"Chittoor","state":"Andhra Pradesh","pincode":"517422"}},
  {"title":"Mr","firstName":"Gaja","lastName":"KS","mobile1":"9886883765","mobile2":"","address":{"city":"CTR","state":"AP","pincode":"517001"}},
  {"title":"Mr","firstName":"K.","lastName":"Manoj","mobile1":"7095490041","mobile2":"9886883765","address":{"city":"Chittoor","state":"Andhra Pradesh","pincode":"517422"}},
  {"title":"Mr","firstName":"Rahul","lastName":"m","mobile1":"7878788675","mobile2":"7878667567","address":{"city":"tirpathi","state":"Andhra Pradesh","pincode":"517501"}},
  {"title":"Mr","firstName":"Rahul","lastName":"m","mobile1":"7095490041","mobile2":"","address":{"city":"tirpathi","state":"Andhra Pradesh","pincode":"517501"}},
  {"title":"Mr","firstName":"Lalith","lastName":"M","mobile1":"6302528584","mobile2":"9881525524","address":{"city":"tirpathi","state":"Andhra Pradesh","pincode":"517501"}},
  {"title":"Mr","firstName":"Lalith","lastName":"M","mobile1":"8847676756","mobile2":"6565786783","address":{"city":"tirpathi","state":"Andhra Pradesh","pincode":"517501"}},
  {"title":"Mr","firstName":"Chetan","lastName":"v","mobile1":"9976543345","mobile2":"8997787799","address":{"city":"tirpathi","state":"Andhra Pradesh","pincode":"517501"}}
    ];

    // ⚠️ IMPORTANT:
    // We are NOT deleting existing contacts.
    // So your new contacts stay safe.

    const result = await Contact.insertMany(oldContacts);
    console.log(`✅ Inserted ${result.length} old contacts`);

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
}
