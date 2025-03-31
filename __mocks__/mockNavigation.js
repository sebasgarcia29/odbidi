// __mocks__/mockNavigation.js
module.exports = () => {
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'), // This preserves the other functionalities
    useNavigation: jest.fn(), // Mocking useNavigation as a function
  }));
};
