// // app/hoc/withAuth.js
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // Use next/navigation for App Router
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";

// const withAuth = (WrappedComponent) => {
//   const ComponentWithAuth = (props) => {
//     const [isMounted, setIsMounted] = useState(false);

//     if (typeof window === "undefined") {
//       return null; // Prevent running router code on the server
//     }

//     const router = useRouter();
//     const [user, loading] = useAuthState(auth);

//     useEffect(() => {
//       setIsMounted(true);
//     }, []);

//     useEffect(() => {
//       if (isMounted && !loading && !user) {
//         router.push("/login"); // Redirect to the login page if not authenticated
//       }
//     }, [isMounted, user, loading, router]);

//     if (loading || !isMounted) {
//       return <p>Loading...</p>;
//     }

//     return <WrappedComponent {...props} />;
//   };

//   ComponentWithAuth.displayName = `withAuth(${
//     WrappedComponent.displayName || WrappedComponent.name || "Component"
//   })`;

//   return ComponentWithAuth;
// };

// export default withAuth;
