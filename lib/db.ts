const { MongoClient } = require("mongodb");


const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

interface User {
  adventure: string;
  discription: string;
  amount: number;
  places: string;
  about: string;
  imageUrl: string;
}
async function addData(bookit: string, places: string, data: User[]) {
  try {
    await client.connect();

    const db = client.db(bookit);
    const collection = db.collection(places);

    const result = await collection.insertMany(data);
    console.log("Data inserted with ID:", result.insertedId);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

addData("bookit", "places", [
  {
    adventure: "Kayaking",
    discription: "Exciting river kayaking experience",
    amount: 999,
    places: "Udupi",
    about:
      "Experience the thrill of kayaking in beautiful rivers with expert guides and top-notch equipment.",
    imageUrl:
      "https://images.unsplash.com/photo-1664867883219-9fc340a52855?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627",
  },
  {
    adventure: "Hiking",
    discription: "Scenic mountain hiking trails",
    amount: 999,
    places: "Coorg",
    about:
      "Explore breathtaking hiking trails in the mountains, suitable for all skill levels.",
    imageUrl:"https://plus.unsplash.com/premium_photo-1661810803959-f91f5195138e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
  },
  {
    adventure: "Scuba Diving",
    discription: "Underwater scuba diving adventures",
    amount: 999,
    places: "Goa",
    about:
      "Discover the underwater world with our guided scuba diving tours, perfect for beginners and experienced divers alike.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1750263796951-f632f96af3e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
  },
  {
    adventure: "Paragliding",
    discription: "Thrilling paragliding experiences",
    amount: 999,
    places: "Bir Billing",
    about:
      "Soar through the skies with our paragliding adventures, offering stunning views and unforgettable experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    adventure: "Camping",
    discription: "Outdoor camping experiences",
    amount: 999,
    places: "Rishikesh",
    about:
      "Enjoy the great outdoors with our camping trips, complete with tents, campfires, and nature activities.",
    imageUrl:
      "https://images.unsplash.com/photo-1663503538745-03bf451b4845?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",   
  },
  {
    adventure: "Rock Climbing",
    discription: "Challenging rock climbing sessions",
    amount: 999,
    places: "Hampi",
    about:
      "Test your climbing skills on natural rock formations with our guided rock climbing sessions.",
    imageUrl:
      "https://images.unsplash.com/photo-1697564677699-807b4c63fdd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=692",
  },
  {
    adventure: "Wildlife Safari",
    discription: "Exciting wildlife safari tours",
    amount: 999,
    places: "Jim Corbett",
    about:
      "Experience the thrill of spotting wild animals in their natural habitat with our wildlife safari tours.",
    imageUrl:
      "https://images.unsplash.com/photo-1656828059237-add66db82a2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  }
]);
