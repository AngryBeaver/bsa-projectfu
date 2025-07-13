// @ts-ignore
export class Adaption implements SystemApi {

    skillList:SkillConfig[] = [];
    _currencyComponent:Component;

    get version() {
        return 2;
    }

    get id() {
        return "projectfu";
    }

// @ts-ignore
    async actorRollSkill(actor, skillId){
        throw new Error("Method not implemented.");
    }
// @ts-ignore
    async actorRollAbility(actor, abilityId){
        throw new Error("Method not implemented.");
    }

    actorCurrenciesGet(actor):Currencies {
        return {"zenit":actor["system"].resources.zenit.value};
    }

    async actorCurrenciesStore(actor, currencies: Currencies): Promise<void> {
        await actor.update({system: {resources:{zenit:{value:currencies.zenit}}}});
    }

    actorSheetAddTab(sheet, html, actor, tabData:{ id: string, label: string, html: string }, tabBody:string):void {
        const tabs = $(html).find('nav.sheet-tabs[data-group="primary"]');
        const tabItem = $('<a class="item rollable tab button-style" data-tab="' + tabData.id + '" title="' + tabData.label + '">'+tabData.html+'</a>');
        tabs.find("a.rollable.tab:not(.zenit-style)").last().after(tabItem);
        const body = $(html).find(".sheet-body");
        const tabContent = $('<div class="tab flexcol desc" style="width:inherit" data-group="primary" data-tab="' + tabData.id + '"></div>');
        body.append(tabContent);
        tabContent.append(tabBody);

        $(html).find('nav.sheet-tabs[data-group="primary"] [data-tab]').on("click",e => {
            sheet.activeTab = e.currentTarget.dataset.tab;
        });
    }

    itemSheetReplaceContent(app, html, element):void {
        html.find('.sheet-header div:last').remove();

        const sheetBody = html.find('.sheet-body');
        sheetBody.html(element);
        sheetBody.addClass("desc")
    }

    get configSkills():SkillConfig[] {
        if(this.skillList.length === 0){
            this.skillList = game["packs"].get("projectfu.skills").index.map(skill=>{
                return {id:skill._id,label:skill.name}
            })
        }
        return this.skillList;
    }

    get configAbilities():AbilityConfig[] {
        return [{
            id: "dex",
            label: "Dexterity"
        },
            {
                id: "mig",
                label: "Might"
            },
            {
                id: "ins",
                label: "Insight"
            },
            {
                id: "wlp",
                label: "Willpower"
            }
            ]
    }

    get configCurrencies():CurrencyConfig[] {
        return [
            {
                id: "zenit",
                factor: 1,
                label: "Zenit",
            }
        ]
    }

    get configCanRollAbility():boolean {
        return true;
    }
    get configLootItemType(): string {
        return "basic";
    }

    get itemPriceAttribute(): string {
        return "system.cost";
    }

    get itemQuantityAttribute(): string {
        return "system.amount";
    }


}