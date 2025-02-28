import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 m-4 mt-8 rounded-lg shadow-lg max-w-md w-full">
    //     <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
    //     <SignUpForm />
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 m-4 mt-28 rounded-lg shadow-lg max-w-lg w-full">
      <h1 className="text-3xl font-extrabold text-center text-primary mb-6">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;