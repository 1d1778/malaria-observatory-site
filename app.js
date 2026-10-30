const stages = [
  {
    title: "子孢子随叮咬进入人体",
    copy: "受感染的雌性按蚊吸血时，将唾液腺中的子孢子注入人体。子孢子进入血液后到达肝脏；输血传播等途径较少见。",
    tag: "人体 · 起点",
  },
  {
    title: "肝细胞内的无性裂体增殖",
    copy: "子孢子侵入肝细胞并进行无性增殖，成熟后释放裂殖子进入血液。间日疟和卵形疟可形成肝内休眠子，日后活化引起复发。",
    tag: "人体 · 肝脏",
  },
  {
    title: "红细胞内增殖，并形成配子体",
    copy: "裂殖子侵入红细胞，发育为环状体、滋养体和裂殖体；红细胞破裂后释放裂殖子。部分虫体分化为雌、雄配子体，但人体内不发生受精。",
    tag: "人体 · 血液",
  },
  {
    title: "在雌按蚊体内完成有性生殖",
    copy: "雌按蚊吸血时摄入配子体；配子体发育成雌、雄配子并受精形成合子，继而成为动合子、穿过胃壁形成卵囊。卵囊内孢子增殖产生子孢子，迁至唾液腺，等待下一次叮咬。",
    tag: "按蚊 · 继续传播",
  },
];

const species = [
  {
    title: "恶性疟原虫",
    latin: "Plasmodium falciparum",
    description: "可导致严重疟疾，是重症和死亡的重要原因之一。出现疑似症状应尽快接受检测与专业治疗。",
  },
  {
    title: "间日疟原虫",
    latin: "Plasmodium vivax",
    description: "可在肝脏形成休眠子，经过一段时间后再次活化，引起复发；治疗需由医生综合评估。",
  },
  {
    title: "卵形疟原虫",
    latin: "Plasmodium ovale",
    description: "同样可能在肝脏形成休眠子并导致复发。具体诊断和治疗方案应由医疗专业人员确定。",
  },
  {
    title: "三日疟原虫",
    latin: "Plasmodium malariae",
    description: "可引起持续或反复感染，部分感染可能迁延较久。可靠检测有助于明确病原。",
  },
  {
    title: "诺氏疟原虫",
    latin: "Plasmodium knowlesi",
    description: "主要见于东南亚部分地区，与猕猴等灵长类动物相关；可进展较快，及时就医很重要。",
  },
];

const stageButtons = [...document.querySelectorAll(".cycle-step")];
const stagePanel = document.querySelector("#stage-detail");

function selectStage(index) {
  const stage = stages[index];
  stageButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  stagePanel.setAttribute("aria-labelledby", stageButtons[index].id);
  stagePanel.querySelector(".detail-count").textContent = `STAGE 0${index + 1} / 04`;
  stagePanel.querySelector("h3").textContent = stage.title;
  stagePanel.querySelector("p").textContent = stage.copy;
  stagePanel.querySelector(".detail-tag").textContent = stage.tag;
}

stageButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectStage(index));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % stageButtons.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + stageButtons.length) % stageButtons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = stageButtons.length - 1;
    selectStage(nextIndex);
    stageButtons[nextIndex].focus();
  });
});

const speciesButtons = [...document.querySelectorAll(".species-chip")];
function selectSpecies(index) {
    speciesButtons.forEach((chip, chipIndex) => {
      const active = chipIndex === index;
      chip.classList.toggle("is-selected", active);
      chip.setAttribute("aria-selected", String(active));
      chip.tabIndex = active ? 0 : -1;
    });
    document.querySelector("#species-panel").setAttribute("aria-labelledby", speciesButtons[index].id);
    document.querySelector(".species-label").textContent = `SPECIES / 0${index + 1}`;
    document.querySelector("#species-title").textContent = species[index].title;
    document.querySelector("#species-description").textContent = species[index].description;
    document.querySelector("#species-latin i").textContent = species[index].latin;
}

speciesButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectSpecies(index));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % speciesButtons.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + speciesButtons.length) % speciesButtons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = speciesButtons.length - 1;
    selectSpecies(nextIndex);
    speciesButtons[nextIndex].focus();
  });
});

const quizOptions = [...document.querySelectorAll(".quiz-option")];
const quizFeedback = document.querySelector("#quiz-feedback");
quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const correct = option.dataset.answer === "true";
    quizOptions.forEach((answer) => {
      answer.disabled = true;
      if (answer.dataset.answer === "true") answer.classList.add("is-correct");
    });
    if (!correct) option.classList.add("is-incorrect");
    quizFeedback.classList.toggle("is-correct", correct);
    quizFeedback.classList.toggle("is-incorrect", !correct);
    quizFeedback.textContent = correct
      ? "答对了！疟疾主要由受感染的雌性按蚊叮咬传播；普通日常接触不会传播。"
      : "这不是主要传播方式。正确答案是受感染的雌性按蚊叮咬；一般握手、共餐或咳嗽不会传播疟疾。";
  });
});
