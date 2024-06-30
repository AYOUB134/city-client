// LoginAPI.js
export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch('https://city-server-production.up.railway.app/api/v1/users');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const users = await response.json();
    console.log("users.data", users.data); // Check the data received

    // Find user based on email and password
    const user = users.data.find(u => u.email === email && u.password === password);
    console.log("user", user); // Log the user object properly

    if (user) {
      return { success: true, userId: user._id };
    } else {
      throw new Error('Invalid email or password.');
    }
  } catch (error) {
    console.error('Login API Error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
};
