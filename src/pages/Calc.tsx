import Calculator from '../components/Calculator'
import PageNav from '../components/PageNav'
import QuoteMachine from '../components/QuoteMachine'

export default function Calc() {
    return(
        <>
            <PageNav />
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-32 items-center">
                    <div></div>
                    <Calculator/>
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}