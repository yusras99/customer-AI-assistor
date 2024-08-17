// // app/login/page.js

// 'use client'; // This marks the component as a Client Component

// import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Import from next/navigation for App Router compatibility
// import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await signInWithPopup(auth, googleProvider);
//       router.push('/');
//     } catch (error) {
//       setError('Failed to sign in with Google: ' + error.message);
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isRegistering) {
//         if (password.length < 6) {
//           throw new Error('Password should be at least 6 characters long.');
//         }
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       router.push('/');
//     } catch (error) {
//       setError('Failed to sign in: ' + error.message);
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
//       <h1>{isRegistering ? 'Register' : 'Login'}</h1>
//       <form onSubmit={handleEmailLogin}>
//         <div style={{ marginBottom: '1rem' }}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//             aria-label="Email"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
//             aria-label="Password"
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '0.5rem',
//             backgroundColor: '#0070f3',
//             color: '#fff',
//             border: 'none',
//             cursor: 'pointer'
//           }}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
//         </button>
//       </form>
//       <button
//         onClick={handleGoogleLogin}
//         style={{
//           width: '100%',
//           padding: '0.5rem',
//           marginTop: '1rem',
//           backgroundColor: '#4285F4',
//           color: '#fff',
//           border: 'none',
//           cursor: 'pointer'
//         }}
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Sign in with Google'}
//       </button>
//       <p
//         style={{ marginTop: '1rem', cursor: 'pointer' }}
//         onClick={() => setIsRegistering(!isRegistering)}
//       >
//         {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
//       </p>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }
