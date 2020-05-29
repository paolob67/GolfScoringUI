'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">GolfScoringUI documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutModule-d43e8a2d1795b4c584fabf9a1e8e5ab0"' : 'data-target="#xs-components-links-module-AboutModule-d43e8a2d1795b4c584fabf9a1e8e5ab0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutModule-d43e8a2d1795b4c584fabf9a1e8e5ab0"' :
                                            'id="xs-components-links-module-AboutModule-d43e8a2d1795b4c584fabf9a1e8e5ab0"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopoverPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopoverPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link">AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountModule-c14cb3cbb7d539cee810bb6dee0e18ee"' : 'data-target="#xs-components-links-module-AccountModule-c14cb3cbb7d539cee810bb6dee0e18ee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountModule-c14cb3cbb7d539cee810bb6dee0e18ee"' :
                                            'id="xs-components-links-module-AccountModule-c14cb3cbb7d539cee810bb6dee0e18ee"' }>
                                            <li class="link">
                                                <a href="components/AccountPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountPageRoutingModule.html" data-type="entity-link">AccountPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ef39b47904ce0c6af327236c71d03a9c"' : 'data-target="#xs-components-links-module-AppModule-ef39b47904ce0c6af327236c71d03a9c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ef39b47904ce0c6af327236c71d03a9c"' :
                                            'id="xs-components-links-module-AppModule-ef39b47904ce0c6af327236c71d03a9c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link">EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EventModule-c4df7d5aa019223e19ca1d7d3f9775cb"' : 'data-target="#xs-components-links-module-EventModule-c4df7d5aa019223e19ca1d7d3f9775cb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventModule-c4df7d5aa019223e19ca1d7d3f9775cb"' :
                                            'id="xs-components-links-module-EventModule-c4df7d5aa019223e19ca1d7d3f9775cb"' }>
                                            <li class="link">
                                                <a href="components/EventPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventPageRoutingModule.html" data-type="entity-link">EventPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LeaderboardListModule.html" data-type="entity-link">LeaderboardListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LeaderboardListModule-40e28dfa2a52e47dcddee1875ab83e5f"' : 'data-target="#xs-components-links-module-LeaderboardListModule-40e28dfa2a52e47dcddee1875ab83e5f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeaderboardListModule-40e28dfa2a52e47dcddee1875ab83e5f"' :
                                            'id="xs-components-links-module-LeaderboardListModule-40e28dfa2a52e47dcddee1875ab83e5f"' }>
                                            <li class="link">
                                                <a href="components/LeaderboardListPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeaderboardListPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeaderboardListPageRoutingModule.html" data-type="entity-link">LeaderboardListPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LeaderboardMobModule.html" data-type="entity-link">LeaderboardMobModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LeaderboardMobModule-484d4013073657993316834ec23ca47c"' : 'data-target="#xs-components-links-module-LeaderboardMobModule-484d4013073657993316834ec23ca47c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeaderboardMobModule-484d4013073657993316834ec23ca47c"' :
                                            'id="xs-components-links-module-LeaderboardMobModule-484d4013073657993316834ec23ca47c"' }>
                                            <li class="link">
                                                <a href="components/LeaderboardMobPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeaderboardMobPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeaderboardMobPageRoutingModule.html" data-type="entity-link">LeaderboardMobPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-fd67e74b146d7423672e3a3fab42b308"' : 'data-target="#xs-components-links-module-LoginModule-fd67e74b146d7423672e3a3fab42b308"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-fd67e74b146d7423672e3a3fab42b308"' :
                                            'id="xs-components-links-module-LoginModule-fd67e74b146d7423672e3a3fab42b308"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link">LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MapModule.html" data-type="entity-link">MapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MapModule-45259d6804bee4c10829cb7300e8c0f9"' : 'data-target="#xs-components-links-module-MapModule-45259d6804bee4c10829cb7300e8c0f9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MapModule-45259d6804bee4c10829cb7300e8c0f9"' :
                                            'id="xs-components-links-module-MapModule-45259d6804bee4c10829cb7300e8c0f9"' }>
                                            <li class="link">
                                                <a href="components/MapPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MapPageRoutingModule.html" data-type="entity-link">MapPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PlayerDetailModule.html" data-type="entity-link">PlayerDetailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PlayerDetailModule-2519e3125c83b8df5cce35c4f7f724a7"' : 'data-target="#xs-components-links-module-PlayerDetailModule-2519e3125c83b8df5cce35c4f7f724a7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlayerDetailModule-2519e3125c83b8df5cce35c4f7f724a7"' :
                                            'id="xs-components-links-module-PlayerDetailModule-2519e3125c83b8df5cce35c4f7f724a7"' }>
                                            <li class="link">
                                                <a href="components/PlayerDetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayerDetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayerDetailPageRoutingModule.html" data-type="entity-link">PlayerDetailPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ScoreListModule.html" data-type="entity-link">ScoreListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ScoreListModule-975eda02d348c03369555da3141afe02"' : 'data-target="#xs-components-links-module-ScoreListModule-975eda02d348c03369555da3141afe02"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ScoreListModule-975eda02d348c03369555da3141afe02"' :
                                            'id="xs-components-links-module-ScoreListModule-975eda02d348c03369555da3141afe02"' }>
                                            <li class="link">
                                                <a href="components/ScoreListPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScoreListPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScoreListPageRoutingModule.html" data-type="entity-link">ScoreListPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ScoreSignModule.html" data-type="entity-link">ScoreSignModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ScoreSignModule-d2f7f3df51f4f6cb23e6964e667ddab1"' : 'data-target="#xs-components-links-module-ScoreSignModule-d2f7f3df51f4f6cb23e6964e667ddab1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ScoreSignModule-d2f7f3df51f4f6cb23e6964e667ddab1"' :
                                            'id="xs-components-links-module-ScoreSignModule-d2f7f3df51f4f6cb23e6964e667ddab1"' }>
                                            <li class="link">
                                                <a href="components/ScoreSignPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScoreSignPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScoreSignPageRoutingModule.html" data-type="entity-link">ScoreSignPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SignUpModule.html" data-type="entity-link">SignUpModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SignUpModule-85bf4c197b510dbe215501a0fe45fb7c"' : 'data-target="#xs-components-links-module-SignUpModule-85bf4c197b510dbe215501a0fe45fb7c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignUpModule-85bf4c197b510dbe215501a0fe45fb7c"' :
                                            'id="xs-components-links-module-SignUpModule-85bf4c197b510dbe215501a0fe45fb7c"' }>
                                            <li class="link">
                                                <a href="components/SignupPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignupPageRoutingModule.html" data-type="entity-link">SignupPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SupportModule.html" data-type="entity-link">SupportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SupportModule-1f1dd961337d9c4e1adb05a6d1b5acde"' : 'data-target="#xs-components-links-module-SupportModule-1f1dd961337d9c4e1adb05a6d1b5acde"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SupportModule-1f1dd961337d9c4e1adb05a6d1b5acde"' :
                                            'id="xs-components-links-module-SupportModule-1f1dd961337d9c4e1adb05a6d1b5acde"' }>
                                            <li class="link">
                                                <a href="components/SupportPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SupportPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SupportPageRoutingModule.html" data-type="entity-link">SupportPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsModule.html" data-type="entity-link">TabsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsModule-f7967277ff0af5fd8ce86391cb9b3860"' : 'data-target="#xs-components-links-module-TabsModule-f7967277ff0af5fd8ce86391cb9b3860"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsModule-f7967277ff0af5fd8ce86391cb9b3860"' :
                                            'id="xs-components-links-module-TabsModule-f7967277ff0af5fd8ce86391cb9b3860"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TutorialModule.html" data-type="entity-link">TutorialModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TutorialModule-29e46689d2542300e2855a890e8de23a"' : 'data-target="#xs-components-links-module-TutorialModule-29e46689d2542300e2855a890e8de23a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TutorialModule-29e46689d2542300e2855a890e8de23a"' :
                                            'id="xs-components-links-module-TutorialModule-29e46689d2542300e2855a890e8de23a"' }>
                                            <li class="link">
                                                <a href="components/TutorialPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TutorialPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TutorialPageRoutingModule.html" data-type="entity-link">TutorialPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/RestClientService.html" data-type="entity-link">RestClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserData.html" data-type="entity-link">UserData</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CheckTutorial.html" data-type="entity-link">CheckTutorial</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CourseAddressResponse.html" data-type="entity-link">CourseAddressResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseHolesResponse.html" data-type="entity-link">CourseHolesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CoursesDetailResponse.html" data-type="entity-link">CoursesDetailResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CoursesResponse.html" data-type="entity-link">CoursesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailedLeaderboardResponse.html" data-type="entity-link">DetailedLeaderboardResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailedScoreResponse.html" data-type="entity-link">DetailedScoreResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventsResponse.html" data-type="entity-link">EventsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeaderboardResponse.html" data-type="entity-link">LeaderboardResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link">LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link">LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoundScoresResponse.html" data-type="entity-link">RoundScoresResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScoreHoleScoresResponse.html" data-type="entity-link">ScoreHoleScoresResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScoresResponse.html" data-type="entity-link">ScoresResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignupRequest.html" data-type="entity-link">SignupRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlopeResponse.html" data-type="entity-link">SlopeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserOptions.html" data-type="entity-link">UserOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsersResponse.html" data-type="entity-link">UsersResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});