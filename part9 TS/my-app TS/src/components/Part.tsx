import { CoursePart } from "../types/types";
const Part = ({part} : {part: CoursePart}) => {

   /**
 * Helper function for exhaustive type checking
 */
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

    let content;

        switch (part.type){
            case "normal":
                    content = <div>
                        <p>
                        <b>{part.name}</b>
                        <br/>
                        exercise count: {part.exerciseCount}
                        <br/>
                        description: {part.description}
                        </p>
                    </div>
            break;
            case "groupProject":
                    content =  <div>
                        <p>
                        <b>{part.name}</b>
                        <br/>
                        exercise count: {part.exerciseCount}
                        <br/>
                        group project count: {part.groupProjectCount}
                        </p>
                    </div> 
                break;

            case "submission":
                    content =  <div>
                        <p>
                        <b>{part.name}</b>
                        <br/>
                        exercise count: {part.exerciseCount}
                        <br/>
                        description: {part.description}
                        <br/>
                        exercise submission link: {part.exerciseSubmissionLink}
                        </p>
                    </div>
                break;
            case "special":
                    content =  <div>
                        <p>
                        <b>{part.name}</b>
                        <br/>
                        exercise count: {part.exerciseCount}
                        <br/>
                        description: {part.description}
                        <br/>
                        requirements: {part.requirements}
                        </p>
                    </div>
                break;
            default:
                return assertNever(part);

        }

        return(
            <>{content}</>
        )
};

export default Part