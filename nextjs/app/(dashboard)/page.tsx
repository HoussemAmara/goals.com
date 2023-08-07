import Image from 'next/image'
import Card from '@/app/components/Card';

export default function Home() {
  return (
    <div className="row">
      <div className="col-xxl-4 col-xl-12 mb-4">
        <Card>
            <div className="h-100 p-5">
                <div className="row align-items-center">
                    <div className="col-xl-8 col-xxl-12">
                        <div className="text-center text-xl-start text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
                            <h1 className="text-primary">Welcome to CallCenter ERP</h1>
                            <p className="text-gray-700 mb-0">Welcome to the callcenter ERP software, where you can manage your calls, customers, and complaints with ease. Whether you need to schedule a callback, update a record, or escalate an issue, we have the tools to help you. Just don't forget to smile and be polite, because you never know who might be listening. And remember, the customer is always right, even when they are wrong.</p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-xxl-12 text-center">
                      <Image className="img-fluid" src="/at-work.svg" alt="Welcome to CallCenter" width="500" height="260"/>
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  )
}
