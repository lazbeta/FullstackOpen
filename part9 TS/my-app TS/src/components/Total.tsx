

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Total = ({courseParts}:{courseParts: any}) => {
    return (
        <div>
             <p>
        <b>Total number of exercises{" "}</b>
        {courseParts.reduce((carry: number, part: {name: string, exerciseCount: number}) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
}