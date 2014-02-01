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
import blackboard.platform.context.Context;
import blackboard.platform.persistence.PersistenceServiceFactory;

public class RuleBuilder {

	public String debugString = "";

	public void buildRule(Context ctx, List<Content> children, JSONArray newRules) throws Exception {
		AvailabilityRuleDbPersister arP = AvailabilityRuleDbPersister.Default.getInstance();
		AvailabilityCriteriaDbPersister acP = AvailabilityCriteriaDbPersister.Default.getInstance();
		BbPersistenceManager bbPm = PersistenceServiceFactory.getInstance().getDbPersistenceManager();
		for (int i = 0; i < newRules.length(); i++) {
			debugString = newRules.toString();
			String contentName = "";
			for (Content c : children) {
				if (c.getId().getExternalString().equals(newRules.getJSONObject(i).getString("fromId"))) {
					contentName = c.getTitle();
				}

			}
			List<AvailabilityCriteria> acS = new ArrayList<AvailabilityCriteria>();
			AvailabilityRule ar = new AvailabilityRule();
			GradeRangeCriteria ac = new GradeRangeCriteria();
			LineitemDbLoader lineItemDbLoader = LineitemDbLoader.Default.getInstance();
			List<Lineitem> lineitems = lineItemDbLoader.loadByCourseId(ctx.getCourseId());
			for (Lineitem lineItem : lineitems) {
				if (lineItem.getName().trim().equals(contentName)) {
					ac.setOutcomeDefinitionId(lineItem.getOutcomeDefinition().getId());
				}
			}
			ar.setContentId(bbPm.generateId(Content.DATA_TYPE, newRules.getJSONObject(i).getString("toId")));
			ar.setTitle("New Rule " + System.currentTimeMillis());
			ar.setType(AvailabilityRule.Type.USER);
			ac.setMinScore(Float.valueOf(newRules.getJSONObject(i).getString("minValue")));
			if (newRules.getJSONObject(i).get("typeRule").equals("1")) {
				ac.setPercentRange(false);
			} else {
				ac.setPercentRange(true);
			}
			arP.persist(ar);
			ac.setRuleId(ar.getId());
			acP.persist(ac);
			acS.add(ac);
			ar.setAvailabilityCriteria(acS);
			arP.persist(ar);
		}
	}

/*http://code.lamsfoundation.org/fisheye/browse/~raw,r=1.6/lams/lams_bb_integration/web/modules/start_lesson_proc.jsp*/


} 	
