//simple test
const handleRoot = (req, res) => {
  const out = {
    Test: 'You have successfully reached the root endpoint of the facerecognition API'
  };
  res.json(out);
};

export default handleRoot;
