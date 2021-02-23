export function ExperienceBar(){
  return(
    <header className="experience-bar">
      <span>0 xp</span>
      <div>
        <div className="xp-bar" style={{ width: '50%'}} />
        <span className="xp-current" style={{left: '50%'}}>300px</span>
      </div>
      <span>600 xp</span>
    </header>
  );
}
