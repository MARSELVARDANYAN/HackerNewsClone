

const generateToken = () => {
  const decodeJWT = (token) => {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  };

  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = decodeJWT(token);
    const userId = decodedToken._id; 
    return userId;
  }
    return null; 
}

export default generateToken;