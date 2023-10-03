// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthContextProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState("");

//   const toggleModal = () => {
//     setIsLoggedIn(!isLoggedIn);
//   };

//   const openModal = () => {
//     setIsLoggedIn(true);
//   };

//   const closeModal = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isOpen: isLoggedIn,
//         onToggle: toggleModal,
//         onOpen: openModal,
//         onClose: closeModal,
//         isLoggedIn,
//         setIsLoggedIn,
//         token,
//         setToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
