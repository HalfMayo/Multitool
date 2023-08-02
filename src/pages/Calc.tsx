import Calculator from '../components/Calculator'
import PageNav from '../components/PageNav'
import QuoteMachine from '../components/QuoteMachine'

export default function Calc() {
    return(
        <>
            <PageNav />
            <div className="h-screen">
                <div className="pt-72 flex flex-col gap-16 items-center justify-start">
                    <Calculator/>
                    <QuoteMachine />
                </div>
            </div>
        </>
    )
}