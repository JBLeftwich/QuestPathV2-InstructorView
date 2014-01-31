package com.jsu.cs596.questpath.build.rules;


import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;

import blackboard.data.content.Content;
import blackboard.data.content.avlrule.AvailabilityCriteria;
import blackboard.data.content.avlrule.AvailabilityRule;
import blackboard.data.content.avlrule.GradeRangeCriteria;
import blackboard.data.gradebook.Lineitem;
import blackboard.persist.BbPersistenceManager;
import blackboard.persist.content.avlrule.AvailabilityCriteriaDbPersister;
import blackboard.persist.content.avlrule.AvailabilityRuleDbPersister;
import blackboard.persist.gradebook.LineitemDbLoader;
import blackboard.platform.BbServiceManager;
import blackboard.platform.context.Context;
import blackboard.platform.persistence.PersistenceService;
import blackboard.platform.persistence.PersistenceServiceFactory;

public class RuleBuilder {

	public String debugString = "";

	public void buildRule(Context ctx, List<Content> children, JSONArray newRules) throws Exception {
		AvailabilityRuleDbPersister arP = AvailabilityRuleDbPersister.Default.getInstance();
		AvailabilityCriteriaDbPersister acP = AvailabilityCriteriaDbPersister.Default.getInstance();
		BbPersistenceManager bbPm = PersistenceServiceFactory.getInstance().getDbPersistenceManager();
		//BbPersistenceManager bbPm = BbServiceManager.getPersistenceService().getDbPersistenceManager();
		List<AvailabilityCriteria> acS = new ArrayList<AvailabilityCriteria>();
		AvailabilityRule ar = new AvailabilityRule();
		GradeRangeCriteria ac = new GradeRangeCriteria();
		LineitemDbLoader lineItemDbLoader = LineitemDbLoader.Default.getInstance();
		List<Lineitem> lineitems = lineItemDbLoader.loadByCourseId(ctx.getCourseId());
		for (Lineitem lineItem : lineitems) {
			if (lineItem.getName().trim().equals("Assignment 1.5 Last Assignment")) {
				ac.setOutcomeDefinitionId(lineItem.getOutcomeDefinition().getId());
			}
		}
		ar.setContentId(bbPm.generateId(Content.DATA_TYPE,"_48_1"));
		ar.setTitle("New Rule " + System.currentTimeMillis());
		ar.setType(AvailabilityRule.Type.USER);
		ac.setMinScore(80.0f);
		ac.setPercentRange(false);
//		arP.persist(ar);
		ac.setRuleId(ar.getId());
//		acP.persist(ac);
		acS.add(ac);
		ar.setAvailabilityCriteria(acS);
		//Persist AR
//		arP.persist(ar);
	}

	/*
_48_1 - Assignment 3.1
_105_1 - Assignment 1.5

Classes:
AvailabilityRule
AvailabilityCriteria
AvailabilityCriteria.RuleType  (GRADE_RANGE_PERCENT, GRADE_RANGE)
subclass - GradeRangeCriteria
OutcomeDefinition?
http://code.lamsfoundation.org/fisheye/browse/~raw,r=1.6/lams/lams_bb_integration/web/modules/start_lesson_proc.jsp
	 */


} 	
