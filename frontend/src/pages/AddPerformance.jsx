import { useState } from "react";
import RoleSelection from "../components/forms/RoleSelection";
import SessionType from "../components/forms/SessionType";
import PerformanceForm from "../components/forms/PerformanceForm";
import GoalForm from "../components/forms/GoalForm";
import VideoUpload from "../components/forms/VideoUpload";

const AddPerformance = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [performanceId, setPerformanceId] = useState(null);

  return (
    <div>
      {step === 1 && <RoleSelection setRole={setRole} next={() => setStep(2)} />}
      {step === 2 && <SessionType setSessionType={setSessionType} next={() => setStep(3)} />}
      {step === 3 && (
        <PerformanceForm
          role={role}
          sessionType={sessionType}
          next={(id) => {
            setPerformanceId(id);
            setStep(4);
          }}
        />
      )}
      {step === 4 && <GoalForm next={() => setStep(5)} />}
      {step === 5 && <VideoUpload performanceId={performanceId} />}
    </div>
  );
};

export default AddPerformance;
