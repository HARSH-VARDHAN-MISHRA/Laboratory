import React from 'react'
import './Service.css'

import xRayRadiography from './x-ray-radiography.jpg'
import computedTomography from './computed-tomography.jpg'
import mriScan from './mri-scan.jpg'
import UcgScan from './ucg-scan.jpg'

const Service = () => {
    return (
        <>
            <section className="service">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <h3 className="heading">Computed Tomography ( CT SCAN )</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={computedTomography} alt="" />
                                </div>
                                <div className="col-md-6">
                                    <p>Computed tomography (CT) is a diagnostic imaging test used to create detailed images of internal organs, bones, soft tissue and blood vessels. The cross-sectional images generated during a CT scan can be reformatted in multiple planes, and can even generate three-dimensional images which can be viewed on a computer monitor, printed on film or transferred to electronic media. CT scanning is often the best method for detecting many different cancers since the images allow your doctor to confirm the presence of a tumor and determine its size and location. CT is fast, painless, noninvasive and accurate. In emergency cases, it can reveal internal injuries and bleeding quickly enough to help save lives.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <h3 className="heading">Magnetic Resonance Imaging (MRI SCAN)</h3>
                            <div className="row d-flex flex-row-reverse">
                                <div className="col-md-6">
                                    <img src={mriScan} alt="" />
                                </div>
                                <div className="col-md-6">
                                    <p>Magnetic resonance imaging (MRI) uses a powerful magnetic field, radio waves and a computer to produce detailed pictures of the body's internal structures that are clearer, more detailed and more likely in some instances to identify and accurately characterize disease than other imaging methods. It is used to evaluate the body for a variety of conditions, including tumors and diseases of the liver, heart, and bowel. It may also be used to monitor an unborn child in the womb. MRI is noninvasive and does not use ionizing radiation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="heading">Ultrasound (USG SCAN)</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={UcgScan} alt="" />
                                </div>
                                <div className="col-md-6">
                                    <p>Ultrasound imaging uses a transducer or probe to generate sound waves and produce pictures of the body's internal structures. It does not use ionizing radiation, has no known harmful effects, and provides a clear picture of soft tissues that don't show up well on x-ray images. Ultrasound is often used to help diagnose unexplained pain, swelling and infection. It may also be used to provide imaging guidance to needle biopsies or to see and evaluate conditions related to blood flow. It's also the preferred imaging method for monitoring a pregnant woman and her unborn child.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="heading">X-ray (Radiography)</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={xRayRadiography} alt="" />
                                </div>
                                <div className="col-md-6">
                                    <p>X-ray or radiography uses a very small dose of ionizing radiation to produce pictures of the body's internal structures. X-rays are the oldest and most frequently used form of medical imaging. They are often used to help diagnosed fractured bones, look for injury or infection and to locate foreign objects in soft tissue. Some x-ray exams may use an iodine-based contrast material or barium to help improve the visibility of specific organs, blood vessels, tissues or bone.</p>
                                </div>

                                <div className="col-12">
                                    <h4>Electrocardiogram (ECG) <small>(Also known as Electrocardiography)</small> </h4>
                                    

                                    <h5>What the Test Does</h5>
                                    <p>Records the electrical activity of the heart including the timing and duration of each electrical phase in your heartbeat.</p>
                                    <h5>Reason for Test</h5>
                                    <ul>
                                        <li>Determines that a heart attack has occurred.</li>
                                        <li>Helps predict if a heart attack is developing.</li>
                                        <li>Monitors changes in heart rhythm.</li>
                                    </ul>

                                    <h4>Ambulatory Electrocardiography and Holter Monitoring <small>(Also known as Holter Monitoring or Ambulatory ECG)</small></h4>

                                    <h5>What the Test Does</h5>
                                    <p>Records the electrical activity of the heart during daily activities.</p>
                                    <h5>Reason for Test</h5>
                                    <ul>
                                        <li>Documents and describes abnormal electrical activity in the heart during daily activities to help doctors determine the condition of the heart.</li>
                                        <li>Helps determine the best possible treatments.</li>
                                    </ul>

                                    <h4>Echocardiogram <small>(echo)</small></h4>

                                    <h5>What the Test Does</h5>
                                    <p>A hand-held device placed on the chest that uses high-frequency sound waves (ultrasound) to produce images of your heart's size, structure and motion.</p>

                                    <h5>Reason for Test</h5>
                                    <ul>
                                        <li>Provides valuable information about the health of your heart.</li>
                                        <li>Helps gather information about abnormal rhythms (arrhythmias) in the heart</li>
                                    </ul>

                                    <h5>Exercise Stress Test <small>(Also known as Treadmill Test, Exercise Test, Exercise Cardiac Stress Test and ECST)</small></h5>

                                    <h5>What the Test Does</h5>
                                    <p>A monitor with electrodes that are attached to the skin on the chest area to record your heart function while you walk in place on a treadmill. Many aspects of your heart function can be checked including heart rate, breathing, blood pressure, ECG (EKG) and how tired you become when exercising.</p>

                                    <h5>Reason for Test</h5>
                                    <ul>
                                        <li>Helps diagnose coronary artery disease (CAD).</li>
                                        <li>Helps diagnose the possible cause of symptoms such as chest pain (angina).</li>
                                        <li>Helps determine your safe level of exercise.</li>
                                        <li>Helps predict dangerous heart-related conditions such as heart attack.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className='heading'>Positron Emission Tomography - Computed Tomography (PET/CT)</h3>
                                    <p>Positron emission tomography (PET) uses small amounts of radioactive materials called radiotracers or radiopharmaceuticals, a special camera and a computer to evaluate organ and tissue functions. By identifying changes at the cellular level, PET may detect the early onset of disease before other imaging tests can.</p>
                                    <p>Tell your doctor if there is any possibility you are pregnant or you are breastfeeding. Your doctor will tell you how to prepare based on the type of your exam. Discuss any recent illnesses, medical conditions, medications you are taking and allergies – especially to contrast material. Your doctor will likely tell you not to eat anything and to drink only water for several hours before your scan. Leave jewelry at home and wear loose, comfortable clothing. You may wear a gown during the exam.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className='heading'>Thyroid Scan</h3>
                                    <p>Thyroid scan and uptake uses small amounts of radioactive materials called radiotracers, a special camera and a computer to provide information about your thyroid's size, shape, position and function that is often unattainable using other imaging procedures.</p>
                                    <p>Tell your doctor if there's a possibility you are pregnant or if you are breastfeeding. Inform your doctor of any recent illnesses, medical conditions, allergies, medications you're taking and whether you've had any procedures within the last two months that used iodine-based contrast material. Your doctor will instruct you on how to prepare and may advise you not to eat for several hours prior to your exam. Leave jewelry at home and wear loose, comfortable clothing. You may be asked to wear a gown.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Service