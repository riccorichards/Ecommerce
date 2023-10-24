// to define how many object could i store in real mongoDb free tier cluster in the atlas

const sampleObject = {
  product_name: "Sample Product Name",
  desc: "This is a sample product description with a max of 200 characters. This description provides some details about the product.",
  image: "https://example.com/sample-image.jpg",
  price: 49.99,
  created_At: new Date(),
  _id: "5f9d27e592fa7a2a9df58027",
  shopping_price: 5.0,
  discount: 10,
};

const objectSize = Buffer.byteLength(JSON.stringify(sampleObject));

console.log(`Size of the sample object: ${objectSize} bytes`); // 339 bytes

//mocka teting with terminal
