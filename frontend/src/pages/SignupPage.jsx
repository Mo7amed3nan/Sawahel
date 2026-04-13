// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

// export default function SignUpPage() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("Sign up submitted:", { name, email, password })
//   }

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-background px-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Create an account</CardTitle>
//           <CardDescription>
//             Enter your details below to sign up
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="name">Name</FieldLabel>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="password">Password</FieldLabel>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Field>
//             </FieldGroup>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" className="w-full">
//               Sign Up
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </main>
//   )
// }
import React from 'react';

const SignupPage = () => {
  return (
    <div>
      <h1>Signup Page</h1>
    </div>
  );
};

export default SignupPage;
