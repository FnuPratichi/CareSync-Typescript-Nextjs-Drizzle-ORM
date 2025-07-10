export default function Homepage(){
  return (<div>
                <h1>Are you new here? Register first ! <a href = "/register"> Register </a> </h1>
                <h1>Already Registered? Login here <a href="/login"> Login</a></h1>
        </div>
  );
}

// we can only <div> , <h1> not html coz that is reserved for layout.tsx 
// why?-  Next.js needs a single <html>/<body> definition for the whole app.



