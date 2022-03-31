import { Link } from "react-router-dom";


export default function Page1() {
  return (<>
    <h1>is Page1</h1>
    <Link to='../page2' >Page2</Link>
  </>)
}
